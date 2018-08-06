package es.imserso.techfile.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ErrorRegistro.
 */
@Entity
@Table(name = "error_registro")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ErrorRegistro implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "numero_linea")
    private Long numeroLinea;

    @Column(name = "texto_linea")
    private String textoLinea;

    @ManyToOne
    @JsonIgnoreProperties("")
    private TipoError tipoError;

    @ManyToOne
    @JsonIgnoreProperties("errorRegistros")
    private Proceso proceso;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNumeroLinea() {
        return numeroLinea;
    }

    public ErrorRegistro numeroLinea(Long numeroLinea) {
        this.numeroLinea = numeroLinea;
        return this;
    }

    public void setNumeroLinea(Long numeroLinea) {
        this.numeroLinea = numeroLinea;
    }

    public String getTextoLinea() {
        return textoLinea;
    }

    public ErrorRegistro textoLinea(String textoLinea) {
        this.textoLinea = textoLinea;
        return this;
    }

    public void setTextoLinea(String textoLinea) {
        this.textoLinea = textoLinea;
    }

    public TipoError getTipoError() {
        return tipoError;
    }

    public ErrorRegistro tipoError(TipoError tipoError) {
        this.tipoError = tipoError;
        return this;
    }

    public void setTipoError(TipoError tipoError) {
        this.tipoError = tipoError;
    }

    public Proceso getProceso() {
        return proceso;
    }

    public ErrorRegistro proceso(Proceso proceso) {
        this.proceso = proceso;
        return this;
    }

    public void setProceso(Proceso proceso) {
        this.proceso = proceso;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ErrorRegistro errorRegistro = (ErrorRegistro) o;
        if (errorRegistro.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), errorRegistro.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ErrorRegistro{" +
            "id=" + getId() +
            ", numeroLinea=" + getNumeroLinea() +
            ", textoLinea='" + getTextoLinea() + "'" +
            "}";
    }
}
