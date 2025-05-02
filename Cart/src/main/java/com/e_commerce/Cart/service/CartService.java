package com.e_commerce.Cart.service;
import com.e_commerce.Cart.entity.Cart;
import com.e_commerce.Cart.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public void addCartItem(Cart cart) {
        cartRepository.callAddCartProcedure(cart);
    }
    public List<Object[]> viewCartByUserId(String userId) {
        return cartRepository.callViewCartProcedure(userId); // Call the repository method to view cart
    }
    public void clearCartByUserId(String userId) {
        cartRepository.callClearCartProcedure(userId); // Call the repository method
    }
    public void updateCartQuantity(Long cartId, int newQuantity) {
        cartRepository.callUpdateQuantityProcedure(cartId, newQuantity); // Call the repository method
    }
    public void removeCartItem(Long cartId) {
        cartRepository.callRemoveCartItemProcedure(cartId); // Call the repository method
    }
}