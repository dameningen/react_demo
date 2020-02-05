/**
 *
 */
package com.example.demo.application.resource;

import java.io.Serializable;

import lombok.Data;

/**
 * @author dameningen
 *
 */
@Data
public class AuthResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    private boolean success;
    private String message;
    private String token;

}
