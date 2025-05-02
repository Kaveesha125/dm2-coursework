package com.urbanfood.feedbackservice.Service;

import com.urbanfood.feedbackservice.Entity.Feedback;
import com.urbanfood.feedbackservice.Repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;
    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    public List<Feedback> getByInquiryType(String type) {
        return feedbackRepository.findByInquiryType(type);
    }

    public List<Feedback> getByEmail(String email) {
        return feedbackRepository.findByEmail(email);
    }
}
