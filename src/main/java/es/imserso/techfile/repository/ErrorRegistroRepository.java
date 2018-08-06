package es.imserso.techfile.repository;

import es.imserso.techfile.domain.ErrorRegistro;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ErrorRegistro entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ErrorRegistroRepository extends JpaRepository<ErrorRegistro, Long> {

}
