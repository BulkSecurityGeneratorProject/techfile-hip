package es.imserso.techfile.repository;

import es.imserso.techfile.domain.TipoError;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TipoError entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoErrorRepository extends JpaRepository<TipoError, Long> {

}
