package estudo.projetolojaapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ProjetoLojaApiApplication {

	@GetMapping("/")
	public String index(){

		return "Página inicial";
	}

	public static void main(String[] args) {
		SpringApplication.run(ProjetoLojaApiApplication.class, args);
	}

}
