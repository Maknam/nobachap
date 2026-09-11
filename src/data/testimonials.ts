export type Testimonial = {
  id: string;
  name: string;
  quote: string;
  verified: boolean;
  publicationConsent: boolean;
};
// Populate only with real, approved customer feedback. No invented reviews.
export const testimonials: Testimonial[] = [];
