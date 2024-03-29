package Reto3_Servicios_Medicos.Reto3_Servicios_Medicos.controlador;

import Reto3_Servicios_Medicos.Reto3_Servicios_Medicos.modelo.Message;
import Reto3_Servicios_Medicos.Reto3_Servicios_Medicos.servicio.serviciosMessage;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author tania
 */

@RestController
@RequestMapping("/api/Message")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class MessageControlador {
     @Autowired
    private serviciosMessage servicios;
    @GetMapping("/all")
    public List<Message> getMessage(){
        return servicios.getAll();
    }
    
    @GetMapping("/{id}")
    public Optional<Message> getMessage(@PathVariable("id") int idMessage){
        return servicios.getMessage(idMessage);
    }
    
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED) //ESTE REQUESTBODY PUEDE GENERAR PTOBLEMAS EN EL FRONT
    public Message save(@RequestBody Message message){
        return servicios.save(message);
    }  
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Message update(@RequestBody Message message) {
        return servicios.update(message);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int messageId) {
        return servicios.deleteMessage(messageId);
    }
}
