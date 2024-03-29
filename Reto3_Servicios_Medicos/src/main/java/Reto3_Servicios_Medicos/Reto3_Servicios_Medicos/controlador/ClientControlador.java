package Reto3_Servicios_Medicos.Reto3_Servicios_Medicos.controlador;

import Reto3_Servicios_Medicos.Reto3_Servicios_Medicos.modelo.Client;
import Reto3_Servicios_Medicos.Reto3_Servicios_Medicos.servicio.serviciosClient;
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
@RequestMapping("/api/Client")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class ClientControlador {
    @Autowired
    private serviciosClient servicios;
    @GetMapping("/all")
    public List<Client> getClient(){
        return servicios.getAll();
    }
    
    @GetMapping("/{id}")
    public Optional<Client> getClient(@PathVariable("id") int idClient){
        return servicios.getClient(idClient);
    }
    
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED) //ESTE REQUESTBODY PUEDE GENERAR PTOBLEMAS EN EL FRONT
    public Client save(@RequestBody Client client){
        return servicios.save(client);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Client update(@RequestBody Client client) {
        return servicios.update(client);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int clientId) {
        return servicios.deleteClient(clientId);
    }
}
