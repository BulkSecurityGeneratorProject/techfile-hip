package es.imserso.techfile.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Cierre.
 */
@Entity
@Table(name = "cierre")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cierre implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "fecha_cierre")
    private LocalDate fechaCierre;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Mes mesCerrado;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Mes mesAbierto;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaCierre() {
        return fechaCierre;
    }

    public Cierre fechaCierre(LocalDate fechaCierre) {
        this.fechaCierre = fechaCierre;
        return this;
    }

    public void setFechaCierre(LocalDate fechaCierre) {
        this.fechaCierre = fechaCierre;
    }

    public Mes getMesCerrado() {
        return mesCerrado;
    }

    public Cierre mesCerrado(Mes mes) {
        this.mesCerrado = mes;
        return this;
    }

    public void setMesCerrado(Mes mes) {
        this.mesCerrado = mes;
    }

    public Mes getMesAbierto() {
        return mesAbierto;
    }

    public Cierre mesAbierto(Mes mes) {
        this.mesAbierto = mes;
        return this;
    }

    public void setMesAbierto(Mes mes) {
        this.mesAbierto = mes;
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
        Cierre cierre = (Cierre) o;
        if (cierre.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cierre.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cierre{" +
            "id=" + getId() +
            ", fechaCierre='" + getFechaCierre() + "'" +
            "}";
    }
}
