package es.imserso.techfile.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import es.imserso.techfile.domain.enumeration.ResultadoProceso;

/**
 * A Proceso.
 */
@Entity
@Table(name = "proceso")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Proceso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "fecha")
    private LocalDate fecha;

    @Column(name = "duracion")
    private Long duracion;

    @Enumerated(EnumType.STRING)
    @Column(name = "resultado")
    private ResultadoProceso resultado;

    @OneToMany(mappedBy = "proceso")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ErrorRegistro> errorRegistros = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("procesos")
    private Fichero fichero;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public Proceso fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Long getDuracion() {
        return duracion;
    }

    public Proceso duracion(Long duracion) {
        this.duracion = duracion;
        return this;
    }

    public void setDuracion(Long duracion) {
        this.duracion = duracion;
    }

    public ResultadoProceso getResultado() {
        return resultado;
    }

    public Proceso resultado(ResultadoProceso resultado) {
        this.resultado = resultado;
        return this;
    }

    public void setResultado(ResultadoProceso resultado) {
        this.resultado = resultado;
    }

    public Set<ErrorRegistro> getErrorRegistros() {
        return errorRegistros;
    }

    public Proceso errorRegistros(Set<ErrorRegistro> errorRegistros) {
        this.errorRegistros = errorRegistros;
        return this;
    }

    public Proceso addErrorRegistro(ErrorRegistro errorRegistro) {
        this.errorRegistros.add(errorRegistro);
        errorRegistro.setProceso(this);
        return this;
    }

    public Proceso removeErrorRegistro(ErrorRegistro errorRegistro) {
        this.errorRegistros.remove(errorRegistro);
        errorRegistro.setProceso(null);
        return this;
    }

    public void setErrorRegistros(Set<ErrorRegistro> errorRegistros) {
        this.errorRegistros = errorRegistros;
    }

    public Fichero getFichero() {
        return fichero;
    }

    public Proceso fichero(Fichero fichero) {
        this.fichero = fichero;
        return this;
    }

    public void setFichero(Fichero fichero) {
        this.fichero = fichero;
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
        Proceso proceso = (Proceso) o;
        if (proceso.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), proceso.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Proceso{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", duracion=" + getDuracion() +
            ", resultado='" + getResultado() + "'" +
            "}";
    }
}
