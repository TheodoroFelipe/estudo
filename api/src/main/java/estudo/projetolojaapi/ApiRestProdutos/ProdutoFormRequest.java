package estudo.projetolojaapi.ApiRestProdutos;

import com.fasterxml.jackson.annotation.JsonFormat;
import estudo.projetolojaapi.model.Produto;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDate;

@Getter @Setter
public class ProdutoFormRequest {

    private Long id;
    private String sku;
    private BigDecimal preco;
    private String nome;
    private String descricao;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate cadastro;

    public ProdutoFormRequest(Long id, String sku, BigDecimal preco, String nome, String descricao, LocalDate cadastro) {
        this.id = id;
        this.sku = sku;
        this.preco = preco;
        this.nome = nome;
        this.descricao = descricao;
        this.cadastro = cadastro;
    }

    public ProdutoFormRequest() {
        super();
    }

    public Produto toModel(){

        return new Produto(id, sku, nome, descricao, preco);
    }

    public static ProdutoFormRequest fromModel(Produto produto){

        return new ProdutoFormRequest(produto.getId(), produto.getSku(),  produto.getPreco(), produto.getNome(), produto.getDescricao(), produto.getDataCadastro());
    }
}

