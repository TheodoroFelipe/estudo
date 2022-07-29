package estudo.projetolojaapi.model;

//para dizer que é uma entidade que representa uma tabela do banco de dados JPA @Entity
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "produto")  //é anotação opcional para nomear a tabela
@Getter @Setter
public class Produto {

    public Produto() {
    }

    public Produto(String sku, String nome, String descricao, BigDecimal preco) {
        this.sku = sku;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
    }

    public Produto(Long id, String sku, String nome, String descricao, BigDecimal preco) {
        this.id = id;
        this.sku = sku;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
    }

    @PrePersist
    public void prePersist(){
        setDataCadastro(LocalDate.now());

    }

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)//fica auto incremente relacionado ao banco de dados utilizado
    private Long id;
    @Column(name = "sku", length = 100)
    private String sku;

    @Column(name = "nome", length = 100)
    private String nome;

    @Column(name = "descricao", length = 250)
    private String descricao;

    @Column(name = "data_cadastro")
    private LocalDate dataCadastro;

    @Column(name = "preco", precision = 16, scale = 2)
    private BigDecimal preco;

    @Override
    public String toString() {
        return "Produto{" +
                "id=" + id +
                ", sku='" + sku + '\'' +
                ", nome='" + nome + '\'' +
                ", descricao='" + descricao + '\'' +
                ", preco=" + preco +
                '}';
    }
}
