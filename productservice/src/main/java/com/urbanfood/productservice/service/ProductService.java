package com.urbanfood.productservice.service;
import com.urbanfood.productservice.entity.Product;
import jakarta.persistence.*;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    @PersistenceContext
    private EntityManager em;

    // Add product using PL/SQL procedure
    public String addProduct(Product product) {
        StoredProcedureQuery query = em.createStoredProcedureQuery("add_product");
        query.registerStoredProcedureParameter("p_name", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("p_desc", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("p_price", Double.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("p_quantity", Integer.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("p_category", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("p_image_url", String.class, ParameterMode.IN);

        query.setParameter("p_name", product.getName());
        query.setParameter("p_desc", product.getDescription());
        query.setParameter("p_price", product.getPrice());
        query.setParameter("p_quantity", product.getQuantity());
        query.setParameter("p_category", product.getCategory());
        query.setParameter("p_image_url", product.getImageUrl());

        query.execute();
        return "Product added successfully!";
    }

    // Get all products using SYS_REFCURSOR
    public List<Product> getAllProducts() {
        StoredProcedureQuery query = em.createStoredProcedureQuery("get_all_products", Product.class);
        query.registerStoredProcedureParameter("p_cursor", void.class, ParameterMode.REF_CURSOR);
        query.execute();
        return query.getResultList();
    }


    // get product bu  id
    public Product getProductById(Long id) {
        StoredProcedureQuery query = em.createStoredProcedureQuery("get_product_by_id", Product.class);
        query.registerStoredProcedureParameter("p_product_id", Long.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("p_cursor", void.class, ParameterMode.REF_CURSOR);

        query.setParameter("p_product_id", id);
        query.execute();

        try {
            return (Product) query.getSingleResult();
        } catch (NoResultException e) {
            return null; // or throw custom exception
        }
    }

    // Search products
    public List<Product> searchProducts(String searchTerm) {
        StoredProcedureQuery query = em.createStoredProcedureQuery("search_products", Product.class);
        query.registerStoredProcedureParameter("p_search_term", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("p_cursor", void.class, ParameterMode.REF_CURSOR);
        query.setParameter("p_search_term", searchTerm);
        query.execute();
        return query.getResultList();
    }

    // Filter by category
    public List<Product> filterByCategory(String category) {
        StoredProcedureQuery query = em.createStoredProcedureQuery("filter_products_by_category", Product.class);
        query.registerStoredProcedureParameter("p_category", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("p_cursor", void.class, ParameterMode.REF_CURSOR);
        query.setParameter("p_category", category);
        query.execute();
        return query.getResultList();
    }



    // Update product by ID
    public String updateProduct(Long id, Product product) {
        StoredProcedureQuery query = em.createStoredProcedureQuery("update_product");
        query.registerStoredProcedureParameter("p_id", Long.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("p_name", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("p_desc", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("p_price", Double.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("p_quantity", Integer.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("p_category", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("p_image_url", String.class, ParameterMode.IN);

        query.setParameter("p_id", id);
        query.setParameter("p_name", product.getName());
        query.setParameter("p_desc", product.getDescription());
        query.setParameter("p_price", product.getPrice());
        query.setParameter("p_quantity", product.getQuantity());
        query.setParameter("p_category", product.getCategory());
        query.setParameter("p_image_url", product.getImageUrl());

        query.execute();
        return "Product updated successfully!";
    }

    // Delete product by ID
    public String deleteProduct(Long id) {
        StoredProcedureQuery query = em.createStoredProcedureQuery("delete_product");
        query.registerStoredProcedureParameter("p_id", Long.class, ParameterMode.IN);
        query.setParameter("p_id", id);
        query.execute();
        return "Product deleted successfully!";
    }
}
