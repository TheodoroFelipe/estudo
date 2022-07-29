package estudo.projetolojaapi.ApiRestProdutos;

import estudo.projetolojaapi.model.Produto;
import estudo.projetolojaapi.repositories.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("/api-produtos")
@CrossOrigin("*")
public class ProdutoController {

    @Autowired
    private ProdutoRepository repository;

    @PostMapping //Post mapping para criar novos recursos no servidor; //Request body para dizer que o produto vem em formato json no corpo da requisição enviada
    public ProdutoFormRequest salvar(@RequestBody ProdutoFormRequest produto){ //esse método estará recebendo produto(os dados) do meu front end;

        Produto entidadeProduto = produto.toModel();
        repository.save(entidadeProduto);
        return ProdutoFormRequest.fromModel(entidadeProduto);
    }

    //URL = /api/produto/id
    @PutMapping("{id}")
    public ResponseEntity<Void> atualizar(@PathVariable Long id, @RequestBody ProdutoFormRequest produto){
        repository.findById(id);
        Optional<Produto> produtoExistente = repository.findById(id);
        if (produtoExistente.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        Produto entidade = produto.toModel();
        entidade.setId(id);
        entidade.setDataCadastro(LocalDate.now());
        repository.save(entidade);
        return ResponseEntity.ok().build();
    }
}
