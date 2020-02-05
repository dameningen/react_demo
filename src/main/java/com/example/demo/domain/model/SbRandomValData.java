/**
 *
 */
package com.example.demo.domain.model;

import java.io.Serializable;

import lombok.Data;

/**
 * @author dameningen
 *
 */
@Data
public class SbRandomValData implements Serializable {
    private static final long serialVersionUID = 1L;

    private String id;
    private String quote;
}
