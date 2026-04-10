from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
import tempfile
import os
from docling.document_converter import DocumentConverter, PdfFormatOption
from docling.datamodel.pipeline_options import PdfPipelineOptions

app = FastAPI(title="Docling Extraction Service")

# Supported formats and their temp file extensions
SUPPORTED_EXTENSIONS = {
    ".pdf", ".docx", ".doc", ".pptx", ".ppt",
    ".xlsx", ".xls", ".html", ".htm", ".md", ".txt",
    ".png", ".jpg", ".jpeg", ".tiff", ".bmp",
}


def get_extension_from_url(url: str) -> str:
    """Extract file extension from URL, default to .pdf if unknown."""
    path = url.split("?")[0]  # strip query params
    _, ext = os.path.splitext(path.lower())
    return ext if ext in SUPPORTED_EXTENSIONS else ".pdf"


class ExtractRequest(BaseModel):
    cloudinary_url: str
    document_id: str
    mime_type: str | None = None  # optional hint, e.g. "application/pdf"


class ExtractResponse(BaseModel):
    document_id: str
    extracted_text: str


@app.get("/")
def health():
    return {"status": "ok", "service": "docling-extractor"}


@app.post("/extract", response_model=ExtractResponse)
async def extract(req: ExtractRequest):
    """
    Downloads a document from Cloudinary and extracts its text using Docling.
    Supports PDF, DOCX, PPTX, XLSX, HTML, Markdown, images, and more.
    Returns the extracted text as markdown.
    """
    # 1. Download file from Cloudinary URL
    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.get(req.cloudinary_url)
            response.raise_for_status()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=502, detail=f"Failed to download file: {e}")

    # 2. Determine file extension
    ext = get_extension_from_url(req.cloudinary_url)

    # 3. Write to a temp file with correct extension so Docling detects format
    with tempfile.NamedTemporaryFile(suffix=ext, delete=False) as tmp:
        tmp.write(response.content)
        tmp_path = tmp.name

    # 4. Run Docling extraction
    try:
        # Disable OCR for PDF (avoids downloading heavy ML models from ModelScope)
        # For image formats, OCR may be needed — leave it as default (enabled)
        is_pdf = ext == ".pdf"
        if is_pdf:
            pipeline_options = PdfPipelineOptions()
            pipeline_options.do_ocr = False
            converter = DocumentConverter(
                format_options={"pdf": PdfFormatOption(pipeline_options=pipeline_options)}
            )
        else:
            converter = DocumentConverter()

        result = converter.convert(tmp_path)
        extracted_text = result.document.export_to_markdown()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Docling extraction failed: {e}")
    finally:
        os.unlink(tmp_path)  # clean up temp file

    return ExtractResponse(
        document_id=req.document_id,
        extracted_text=extracted_text,
    )
