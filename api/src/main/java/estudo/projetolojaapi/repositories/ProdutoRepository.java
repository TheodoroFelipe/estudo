package estudo.projetolojaapi.repositories;

import estudo.projetolojaapi.model.Produto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}