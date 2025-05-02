package com.e_commerce.Cart.repository;
import com.e_commerce.Cart.entity.Cart;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.StoredProcedureQuery;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;
import java.util.List;

//
@Repository
public class CartRepository {

    @PersistenceContext
    private EntityManager entityManager; // Injecting EntityManager for database operations

    @Transactional
    public void callAddCartProcedure(Cart cart) {
        entityManager.createNativeQuery("CALL ADDCART(:USER_ID, :PRODUCT_NAME, :QUANTITY, :PRICE)")
                .setParameter("USER_ID", cart.getUserId())
                .setParameter("PRODUCT_NAME", cart.getProductName())
                .setParameter("QUANTITY", cart.getQuantity())
                .setParameter("PRICE", cart.getPrice())
                .executeUpdate();
    }
    @Transactional
    public List<Object[]> callViewCartProcedure(String userId) {
        // Create a StoredProcedureQuery for the VIEWCART procedure
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("VIEWCART");

        // Register the input and output parameters
        query.registerStoredProcedureParameter("USER_ID", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("CART_CURSOR", void.class, ParameterMode.REF_CURSOR);

        // Set the input parameter
        query.setParameter("USER_ID", userId);

        // Execute the procedure and retrieve the result
        return query.getResultList();
    }
    @Transactional
    public void callClearCartProcedure(String userId) {
        // Execute the PL/SQL procedure "CLEARCART" using named parameters
        entityManager.createNativeQuery("CALL CLEARCART(:USER_ID)")
                .setParameter("USER_ID", userId) // Map user ID
                .executeUpdate(); // Execute the procedure
    }
    @Transactional
    public void callUpdateQuantityProcedure(Long cartId, int newQuantity) {
        entityManager.createNativeQuery("CALL UPDATEQUANTITY(:CART_ID, :NEW_QUANTITY)")
                .setParameter("CART_ID", cartId) // Map cart ID
                .setParameter("NEW_QUANTITY", newQuantity) // Map new quantity
                .executeUpdate(); // Execute the procedure
    }
    @Transactional
    public void callRemoveCartItemProcedure(Long cartId) {
        entityManager.createNativeQuery("CALL REMOVECARTITEM(:CART_ID)")
                .setParameter("CART_ID", cartId) // Map cart ID
                .executeUpdate(); // Execute the procedure
    }
}