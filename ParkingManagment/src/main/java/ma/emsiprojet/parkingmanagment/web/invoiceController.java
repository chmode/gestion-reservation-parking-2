package ma.emsiprojet.parkingmanagment.web;
import ma.emsiprojet.parkingmanagment.entities.Invoice;
import ma.emsiprojet.parkingmanagment.repositories.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/invoices")
public class invoiceController {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @PostMapping("/add")
    public String addInvoice(@RequestBody Invoice invoice) {
        invoiceRepository.save(invoice);
        return "Invoice added successfully";
    }
}

