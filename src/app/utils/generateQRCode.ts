import QRCode from 'qrcode';

export async function generateBrandQRCode(url: string): Promise<string> {
  try {
    // 1. Generate standard QR Code as a Data URL
    // We use "H" (High) error correction so the logo in the middle doesn't break scannability
    const qrCodeDataUrl = await QRCode.toDataURL(url, {
      errorCorrectionLevel: 'H',
      margin: 4,
      width: 300,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });

    // 2. Create an off-screen HTML5 canvas to draw the QR + Logo
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Canvas 2D context not available');
    }

    // 3. Load the QR Code data URL onto the canvas
    const qrImage = new Image();
    qrImage.src = qrCodeDataUrl;
    await new Promise((resolve, reject) => {
      qrImage.onload = resolve;
      qrImage.onerror = reject;
    });

    ctx.drawImage(qrImage, 0, 0, 300, 300);

    // 4. Load the custom logo and draw it in the center
    const logoImage = new Image();
    logoImage.src = '/assets/logo.png'; // Path to the logo we copied over
    
    try {
      await new Promise((resolve, reject) => {
        logoImage.onload = resolve;
        logoImage.onerror = reject;
      });

      const logoSize = 70; // Safe size for 300x300 QR
      const logoX = (300 - logoSize) / 2;
      const logoY = (300 - logoSize) / 2;

      ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
    } catch (logoError) {
      console.warn('Could not load logo for QR code. Returning standard QR.', logoError);
      // We can just proceed without throwing, returning the QR code without the logo
    }

    // 5. Export as a final image
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
}
