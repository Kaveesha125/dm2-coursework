package com.e_commerce.Cart.controller;
import com.e_commerce.Cart.entity.Cart;
import com.e_commerce.Cart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {
    @Autowired
    private CartService cartService;

    public CartController(CartService cartService) {
            this.cartService = cartService;
    }
    @PostMapping("/add")
    public ResponseEntity<String> addCart(@RequestBody Cart cart) {
        try {
            cartService.addCartItem(cart);
            return ResponseEntity.ok("Cart added successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while adding the cart: " + e.getMessage());
        }
    }
    @GetMapping("/view/{userId}")
    public ResponseEntity<?> viewCart(@PathVariable String userId) {
        try {
            // Call the service to get the cart items for the user
            List<Object[]> cartItems = cartService.viewCartByUserId(userId);
            return ResponseEntity.ok(cartItems); // Return the cart items as the response
        } catch (Exception e) {
            // Return error response if something goes wrong
            return ResponseEntity.status(500).body("An error occurred while retrieving the cart: " + e.getMessage());
        }
    }
    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<String> clearCart(@PathVariable String userId) {
        try {
            cartService.clearCartByUserId(userId); // Call the service to clear the cart
            return ResponseEntity.ok("Cart cleared successfully!");
        } catch (Exception e) {
            // Return error response if something goes wrong
            return ResponseEntity.status(500).body("An error occurred while clearing the cart: " + e.getMessage());
        }
    }
    @PutMapping("/update-quantity/{cartId}")
    public ResponseEntity<String> updateCartQuantity(@PathVariable Long cartId, @RequestBody Map<String, Integer> requestBody) {
        try {
            int newQuantity = requestBody.get("quantity"); // Extract the quantity from the JSON
            cartService.updateCartQuantity(cartId, newQuantity); // Call the service to update the quantity
            return ResponseEntity.ok("Quantity updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while updating the quantity: " + e.getMessage());
        }
    }
    @DeleteMapping("/remove/{cartId}")
    public ResponseEntity<String> removeCartItem(@PathVariable Long cartId) {
        try {
            cartService.removeCartItem(cartId); // Call the service to remove the cart item
            return ResponseEntity.ok("Cart item removed successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while removing the cart item: " + e.getMessage());
        }
    }
}