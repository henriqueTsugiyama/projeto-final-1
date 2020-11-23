import PDFKit from 'pdfkit';
import fs from 'fs';
import Product from '../models/Product';


class PDFController {
    async store(req, res) {
    try {
            const { id } = req.params;
            const fetchProduct = await Product.findOne({ _id: id });

            if(!fetchProduct){
                return res.status(400).json({ message:'error, validation failed. Remember: check to see if id is valid'});
            }
            const { name, description, price } = fetchProduct;

            const pdf = new PDFKit();
    
            pdf.text(`All Bertinho`)
            pdf.text(`${name} - ${description}`)
            pdf.text(`Apenas: R$${price}`)
            .fillColor('#999');
            pdf.text(`
            Leia o QRCode diretamente do seu celular
            e faça a compra mais rápida da sua vida!`);
            pdf.image(`tmp/qrcodes/${id}.png`, 150, 150);
        
            pdf.pipe(fs.createWriteStream(`tmp/pdf/${name}.pdf`));
            pdf.end();

            return res.status(200).json({message: "You sucessfully generated your pdf file"});
    }
       
    catch (err) {
        return res.status(400).json(err);
      }
    }
  }



export default new PDFController;
