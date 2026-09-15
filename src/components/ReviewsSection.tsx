import React, { useState } from 'react';
import {
  Star,
  CheckCircle,
  MessageSquare,
  ShieldCheck,
  Send,
  Plus
} from 'lucide-react';
import { Review } from '../types.ts';

interface ReviewsSectionProps {
  reviews: Review[];
  onSubmitReview: (reviewData: Partial<Review>) => Promise<void>;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onSubmitReview,
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [servicePurchased, setServicePurchased] = useState('Local SEO & Google Business Profile Optimization');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const approvedReviews = reviews.filter((r) => r.isApproved);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !reviewText) return;
    setLoading(true);
    try {
      await onSubmitReview({
        customerName: name,
        company: company || 'Independent Business',
        role: role || 'Business Owner',
        servicePurchased,
        rating,
        review: reviewText,
        source: 'Verified Client Submission',
        isFeatured: false,
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowReviewForm(false);
        setName('');
        setCompany('');
        setReviewText('');
      }, 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reviews-section" className="py-20 border-t border-slate-900 bg-slate-950/70 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with Aggregate Rating */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-3.5 py-1 text-xs font-semibold text-emerald-300">
              <Star className="h-3.5 w-3.5 fill-emerald-400 text-emerald-400" />
              <span>Verified Client Feedback</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
              Trusted by Ambitious Business Owners
            </h2>
            <p className="text-slate-300 text-sm max-w-xl">
              Authentic reviews from founders, marketing directors, and local practice owners whose businesses rank top 3 and generate consistent organic inquiries.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-3.5 text-center">
              <div className="flex items-center justify-center gap-1 text-xl font-extrabold text-white">
                <span>4.9</span>
                <Star className="h-4 w-4 fill-emerald-400 text-emerald-400" />
              </div>
              <div className="text-[11px] text-slate-400">85+ Verified Ratings</div>
            </div>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-950/30 px-4 py-3 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/40 transition"
            >
              <Plus className="h-4 w-4" />
              <span>Leave a Review</span>
            </button>
          </div>
        </div>

        {/* Leave Review Form Dropdown */}
        {showReviewForm && (
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 max-w-2xl mx-auto shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2">Submit Verified Review</h3>
            {submitted ? (
              <div className="rounded-lg bg-emerald-950/40 border border-emerald-500/40 p-4 text-center text-xs text-emerald-300">
                Thank you! Your review has been submitted to the agency review verification queue.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dr. Michael Harrison"
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Company / Business *</label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Austin Smiles Clinic"
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1">Service Delivered</label>
                    <select
                      value={servicePurchased}
                      onChange={(e) => setServicePurchased(e.target.value)}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
                    >
                      <option>Local SEO & Google Business Profile Optimization</option>
                      <option>AI Visibility, AEO & GEO Optimization</option>
                      <option>Technical & Monthly SEO</option>
                      <option>SEO-Engineered Web Development</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Rating</label>
                    <div className="flex items-center gap-2 pt-1.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRating(s)}
                          className="text-slate-400 hover:text-emerald-400"
                        >
                          <Star
                            className={`h-5 w-5 ${
                              s <= rating ? 'fill-emerald-400 text-emerald-400' : 'text-slate-600'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs text-slate-400 ml-1 font-mono">{rating}/5 Stars</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Your Detailed Experience & Results *</label>
                  <textarea
                    required
                    rows={3}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share specific results (rankings, traffic, phone calls, communication)..."
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="rounded-lg border border-slate-800 px-4 py-2 text-slate-400 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-emerald-500 px-5 py-2 font-bold text-slate-950 hover:bg-emerald-400 flex items-center gap-1.5 shadow"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{loading ? 'Submitting...' : 'Submit Review'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Reviews Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {approvedReviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div>
                {/* Rating & Source Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-emerald-400 text-emerald-400" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                    <ShieldCheck className="h-3 w-3 text-emerald-400" />
                    {rev.source || 'Verified Client'}
                  </span>
                </div>

                {/* Review Text */}
                <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{rev.review}"
                </p>
              </div>

              {/* Author & Service Tag */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{rev.customerName}</h4>
                  <div className="text-[11px] text-slate-400">
                    {rev.role && `${rev.role}, `}{rev.company}
                  </div>
                  <div className="text-[10px] text-emerald-400/90 font-medium mt-0.5">
                    Service: {rev.servicePurchased}
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 font-mono">
                  {rev.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
