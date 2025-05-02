package com.urbanfood.feedbackservice.Repository;

import com.urbanfood.feedbackservice.Entity.Feedback;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface  FeedbackRepository extends MongoRepository<Feedback, String> {
    List<Feedback> findByEmail(String email);
    List<Feedback> findByInquiryType(String inquiryType);


}
