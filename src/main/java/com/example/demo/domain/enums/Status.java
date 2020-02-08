package com.example.demo.domain.enums;

public enum Status {

    New,
    Assigned,
    Resolved,
    Approved,
    Disapproved,
    Closed;

    public static Status getStatus(String status){
        switch (status){
            case "New": return New;
            case "Assigned": return Assigned;
            case "Resolved": return Resolved;
            case "Approved": return Approved;
            case "Disapproved": return Disapproved;
            case "Closed": return  Closed;
            default: return New;
        }
    }
}
