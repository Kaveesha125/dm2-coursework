package com.urbanfood.feedbackservice.Controller;


import com.urbanfood.feedbackservice.Entity.Feedback;
import com.urbanfood.feedbackservice.Service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedback")
@CrossOrigin(origins = "http://localhost:5173")
public class FeedbackController {

    @Autowired
    private FeedbackService service;
    @PostMapping
    public Feedback createFeedback(@RequestBody Feedback feedback) {
        return service.saveFeedback(feedback);
    }

    @GetMapping
    public List<Feedback> getAllFeedbacks() {
        return service.getAllFeedback();
    }

    @GetMapping("/inquiry")
    public List<Feedback> getByInquiryType(@RequestParam String type) {
        return service.getByInquiryType(type);
    }

    @GetMapping("/email")
    public List<Feedback> getByEmail(@RequestParam String email) {
        return service.getByEmail(email);
    }
}
