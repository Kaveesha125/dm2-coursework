package com.urbanfood.feedbackservice.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "feedback")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Feedback {

    @Id
    private String id;
    private String inquiryType;
    private String country;
    private String phone;
    private String Name;
    private String email;
    private String invoiceNo;
    private String message;


}
