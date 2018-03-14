package io.cobra.orderservice.exception;

public class OrderNotFoundException extends Exception {
    
    public OrderNotFoundException(int id) {
        super("No Order with id = " + id + " found.");
    }
}
