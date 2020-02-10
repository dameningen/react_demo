/**
 *
 */
package com.example.demo.application.resource;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

/**
 * @author dameningen
 *
 */
@Data
public class Response<T> implements Serializable {

    private static final long serialVersionUID = 1L;

    private T data;
    private List<String> errors;

    public List<String> getErrors() {
        if (this.errors == null) {
            this.errors = new ArrayList<String>();
        }
        return errors;
    }
}
