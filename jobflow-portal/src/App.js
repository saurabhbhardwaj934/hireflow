// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Search, MapPin, Briefcase, Clock, DollarSign, Filter, User, Bookmark, Mail, Phone, Globe, ChevronRight } from 'lucide-react';
import './App.css';

// Job Data
const initialJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    logo: "TC",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $150k",
    posted: "2 days ago",
    description: "We're looking for a Senior Frontend Developer with React expertise to join our growing team.",
    tags: ["React", "TypeScript", "Redux", "CSS3"],
    requirements: ["5+ years of React experience", "Strong TypeScript skills", "Experience with state management"],
    benefits: ["Remote work", "Health insurance", "Stock options", "Flexible hours"]
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataSystems LLC",
    logo: "DS",
    location: "New York, NY",
    type: "Full-time",
    salary: "$110k - $140k",
    posted: "5 days ago",
    description: "Join our backend team to design and implement scalable microservices.",
    tags: ["Node.js", "Python", "AWS", "Docker"],
    requirements: ["3+ years of Node.js", "Experience with AWS", "Microservices architecture"],
    benefits: ["Competitive salary", "Learning budget", "Team events", "401k matching"]
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "CreativeDesigns",
    logo: "CD",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$90k - $120k",
    posted: "1 week ago",
    description: "We're seeking a talented UI/UX Designer to create beautiful, intuitive interfaces.",
    tags: ["Figma", "User Research", "Prototyping", "Wireframing"],
    requirements: ["Portfolio required", "3+ years UI/UX experience", "Figma expertise"],
    benefits: ["Design budget", "Conference tickets", "Creative freedom", "Remote friendly"]
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudInfra",
    logo: "CI",
    location: "Austin, TX",
    type: "Contract",
    salary: "$130k - $160k",
    posted: "3 days ago",
    description: "Looking for a DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines.",
    tags: ["Kubernetes", "Terraform", "CI/CD", "Azure"],
    requirements: ["Kubernetes certification", "Terraform experience", "CI/CD pipeline design"],
    benefits: ["High day rate", "Remote work", "Cutting-edge tech", "Flexible schedule"]
  },
  {
    id: 5,
    title: "Full Stack Developer",
    company: "StartupXYZ",
    logo: "SX",
    location: "Remote",
    type: "Full-time",
    salary: "$100k - $130k",
    posted: "1 day ago",
    description: "Join our early-stage startup and work across the entire stack.",
    tags: ["React", "Node.js", "MongoDB", "GraphQL"],
    requirements: ["Full stack experience", "Startup mindset", "Rapid prototyping"],
    benefits: ["Equity options", "Remote first", "Unlimited PTO", "Fast growth"]
  },
  {
    id: 6,
    title: "Product Manager",
    company: "ProductLabs",
    logo: "PL",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$130k - $160k",
    posted: "4 days ago",
    description: "Lead product strategy and development for our flagship SaaS platform.",
    tags: ["Product Strategy", "Agile", "User Stories", "Roadmapping"],
    requirements: ["5+ years PM experience", "SaaS background", "Data-driven decision making"],
    benefits: ["Leadership role", "Bonus structure", "Professional development", "Great team"]
  }
];

// Navbar Component
const Navbar = ({ bookmarkedJobs, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <div className="logo-icon">💼</div>
          <span>JobFlow</span>
        </Link>
        
        <form onSubmit={handleSearch} className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search jobs, companies, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-btn">Search</button>
        </form>
        
        <div className="nav-links">
          <Link to="/jobs" className="nav-link">
            <Briefcase size={20} />
            <span>Jobs</span>
          </Link>
          <Link to="/bookmarks" className="nav-link">
            <Bookmark size={20} />
            <span>Saved ({bookmarkedJobs.length})</span>
          </Link>
          <Link to="/profile" className="nav-link">
            <User size={20} />
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Job Card Component
const JobCard = ({ job, onBookmark, isBookmarked, onApply }) => {
  return (
    <div className="job-card">
      <div className="job-header">
        <div className="company-logo">
          <span>{job.logo}</span>
        </div>
        <div className="job-title-section">
          <h3>{job.title}</h3>
          <div className="company-name">{job.company}</div>
        </div>
        <button 
          className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
          onClick={() => onBookmark(job.id)}
        >
          <Bookmark size={20} />
        </button>
      </div>
      
      <div className="job-details">
        <div className="detail">
          <MapPin size={16} />
          <span>{job.location}</span>
        </div>
        <div className="detail">
          <Briefcase size={16} />
          <span>{job.type}</span>
        </div>
        <div className="detail">
          <DollarSign size={16} />
          <span>{job.salary}</span>
        </div>
        <div className="detail">
          <Clock size={16} />
          <span>{job.posted}</span>
        </div>
      </div>
      
      <p className="job-description">{job.description}</p>
      
      <div className="job-tags">
        {job.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
      
      <div className="job-actions">
        <Link to={`/job/${job.id}`} className="view-details">
          View Details <ChevronRight size={16} />
        </Link>
        <button className="apply-btn" onClick={() => onApply(job)}>
          Apply Now
        </button>
      </div>
    </div>
  );
};

// Filters Component
const Filters = ({ filters, onFilterChange }) => {
  const locations = ['Remote', 'New York, NY', 'San Francisco, CA', 'Austin, TX', 'Boston, MA'];
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
  const roles = ['Frontend', 'Backend', 'Full Stack', 'UI/UX', 'DevOps', 'Product'];

  return (
    <div className="filters">
      <div className="filter-section">
        <h3><Filter size={20} /> Location</h3>
        {locations.map(location => (
          <label key={location} className="filter-option">
            <input
              type="checkbox"
              checked={filters.locations.includes(location)}
              onChange={() => onFilterChange('locations', location)}
            />
            <span>{location}</span>
          </label>
        ))}
      </div>
      
      <div className="filter-section">
        <h3><Briefcase size={20} /> Job Type</h3>
        {jobTypes.map(type => (
          <label key={type} className="filter-option">
            <input
              type="checkbox"
              checked={filters.jobTypes.includes(type)}
              onChange={() => onFilterChange('jobTypes', type)}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      
      <div className="filter-section">
        <h3><Globe size={20} /> Role</h3>
        {roles.map(role => (
          <label key={role} className="filter-option">
            <input
              type="checkbox"
              checked={filters.roles.includes(role)}
              onChange={() => onFilterChange('roles', role)}
            />
            <span>{role}</span>
          </label>
        ))}
      </div>
      
      
      <button 
        className="clear-filters"
        onClick={() => onFilterChange('clear')}
      >
        Clear All Filters
      </button>
    </div>
  );
};

// Job Details Component
const JobDetails = ({ job, onApply, onBookmark, isBookmarked }) => {
  if (!job) return <div className="loading">Loading...</div>;

  return (
    <div className="job-details-page">
      <div className="job-detail-card">
        <div className="job-detail-header">
          <div className="company-header">
            <div className="company-logo large">
              <span>{job.logo}</span>
            </div>
            <div>
              <h1>{job.title}</h1>
              <h2>{job.company}</h2>
            </div>
          </div>
          
          <div className="header-actions">
            <button 
              className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
              onClick={() => onBookmark(job.id)}
            >
              <Bookmark size={20} />
              {isBookmarked ? 'Saved' : 'Save Job'}
            </button>
            <button className="apply-btn large" onClick={() => onApply(job)}>
              Apply Now
            </button>
          </div>
        </div>
        
        <div className="job-meta">
          <div className="meta-item">
            <MapPin size={20} />
            <div>
              <span className="meta-label">Location</span>
              <span className="meta-value">{job.location}</span>
            </div>
          </div>
          <div className="meta-item">
            <Briefcase size={20} />
            <div>
              <span className="meta-label">Job Type</span>
              <span className="meta-value">{job.type}</span>
            </div>
          </div>
          <div className="meta-item">
            <DollarSign size={20} />
            <div>
              <span className="meta-label">Salary</span>
              <span className="meta-value">{job.salary}</span>
            </div>
          </div>
          <div className="meta-item">
            <Clock size={20} />
            <div>
              <span className="meta-label">Posted</span>
              <span className="meta-value">{job.posted}</span>
            </div>
          </div>
        </div>
        
        <div className="job-content">
          <div className="section">
            <h3>Job Description</h3>
            <p>{job.description}</p>
          </div>
          
          <div className="section">
            <h3>Requirements</h3>
            <ul>
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
          
          <div className="section">
            <h3>Benefits</h3>
            <div className="benefits-grid">
              {job.benefits.map((benefit, index) => (
                <div key={index} className="benefit">
                  <span className="benefit-icon">✓</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="section">
            <h3>Skills & Technologies</h3>
            <div className="skills">
              {job.tags.map((tag, index) => (
                <span key={index} className="skill-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="apply-section">
          <h3>Ready to Apply?</h3>
          <p>Submit your application for this exciting opportunity.</p>
          <button className="apply-btn large" onClick={() => onApply(job)}>
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Application Modal
const ApplicationModal = ({ job, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Apply for {job.title}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="application-form">
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Resume/CV *</label>
            <div className="file-upload">
              <input
                type="file"
                name="resume"
                onChange={handleChange}
                accept=".pdf,.doc,.docx"
                required
              />
              <span>Upload PDF, DOC, or DOCX</span>
            </div>
          </div>
          
          <div className="form-group">
            <label>Cover Letter</label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us why you're interested in this position..."
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [jobs, setJobs] = useState(initialJobs);
  const [filteredJobs, setFilteredJobs] = useState(initialJobs);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({
    locations: [],
    jobTypes: [],
    roles: [],
    salary: 50
  });

  // Filter jobs based on criteria
  useEffect(() => {
    let filtered = jobs;
    
    if (filters.locations.length > 0) {
      filtered = filtered.filter(job => filters.locations.includes(job.location));
    }
    
    if (filters.jobTypes.length > 0) {
      filtered = filtered.filter(job => filters.jobTypes.includes(job.type));
    }
    
    if (filters.roles.length > 0) {
      filtered = filtered.filter(job => 
        filters.roles.some(role => 
          job.title.toLowerCase().includes(role.toLowerCase()) ||
          job.tags.some(tag => tag.toLowerCase().includes(role.toLowerCase()))
        )
      );
    }
    
    // Filter by minimum salary (simplified)
    const minSalary = filters.salary;
    filtered = filtered.filter(job => {
      const salaryNum = parseInt(job.salary.replace(/[^0-9]/g, ''));
      return salaryNum >= minSalary * 1000;
    });
    
    setFilteredJobs(filtered);
  }, [filters, jobs]);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredJobs(jobs);
      return;
    }
    
    const filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    setFilteredJobs(filtered);
  };

  const handleBookmark = (jobId) => {
    if (bookmarkedJobs.includes(jobId)) {
      setBookmarkedJobs(bookmarkedJobs.filter(id => id !== jobId));
    } else {
      setBookmarkedJobs([...bookmarkedJobs, jobId]);
    }
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const handleApplicationSubmit = (formData) => {
    alert(`Application submitted for ${selectedJob.title} at ${selectedJob.company}!\n\nWe'll review your application and get back to you soon.`);
    setShowApplicationModal(false);
    setSelectedJob(null);
  };

  const handleFilterChange = (type, value) => {
    if (type === 'clear') {
      setFilters({
        locations: [],
        jobTypes: [],
        roles: [],
        salary: 50
      });
      return;
    }
    
    setFilters(prev => {
      const currentValues = prev[type];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [type]: currentValues.filter(v => v !== value)
        };
      } else {
        return {
          ...prev,
          [type]: [...currentValues, value]
        };
      }
    });
  };

  return (
    <Router>
      <div className="App">
        <Navbar bookmarkedJobs={bookmarkedJobs} onSearch={handleSearch} />
        
        <main>
          <Routes>
            <Route path="/" element={
              <div className="homepage">
                <div className="hero">
                  <h1>Find Your Dream Job</h1>
                  <p>Discover thousands of job opportunities with all the information you need.</p>
                  <Link to="/jobs" className="cta-button">
                    Browse Jobs <ChevronRight size={20} />
                  </Link>
                </div>
                
                <div className="stats">
                  <div className="stat">
                    <h3>500+</h3>
                    <p>Companies</p>
                  </div>
                  <div className="stat">
                    <h3>2,000+</h3>
                    <p>Jobs Posted</p>
                  </div>
                  <div className="stat">
                    <h3>95%</h3>
                    <p>Success Rate</p>
                  </div>
                </div>
                
                <div className="featured-jobs">
                  <h2>Featured Jobs</h2>
                  <div className="jobs-grid">
                    {jobs.slice(0, 3).map(job => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onBookmark={handleBookmark}
                        isBookmarked={bookmarkedJobs.includes(job.id)}
                        onApply={handleApply}
                      />
                    ))}
                  </div>
                </div>
              </div>
            } />
            
            <Route path="/jobs" element={
              <div className="jobs-page">
                <div className="page-header">
                  <h1>Job Listings</h1>
                  <p>{filteredJobs.length} jobs found</p>
                </div>
                
                <div className="jobs-container">
                  <Filters filters={filters} onFilterChange={handleFilterChange} />
                  
                  <div className="jobs-list">
                    {filteredJobs.length === 0 ? (
                      <div className="no-results">
                        <h3>No jobs found</h3>
                        <p>Try adjusting your filters or search terms</p>
                      </div>
                    ) : (
                      filteredJobs.map(job => (
                        <JobCard
                          key={job.id}
                          job={job}
                          onBookmark={handleBookmark}
                          isBookmarked={bookmarkedJobs.includes(job.id)}
                          onApply={handleApply}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            } />
            
            <Route path="/job/:id" element={
              <JobDetails
                job={jobs.find(j => j.id === parseInt(window.location.pathname.split('/')[2]))}
                onApply={handleApply}
                onBookmark={handleBookmark}
                isBookmarked={bookmarkedJobs.includes(parseInt(window.location.pathname.split('/')[2]))}
              />
            } />
            
            <Route path="/bookmarks" element={
              <div className="bookmarks-page">
                <div className="page-header">
                  <h1>Saved Jobs</h1>
                  <p>{bookmarkedJobs.length} jobs saved</p>
                </div>
                
                <div className="jobs-list">
                  {bookmarkedJobs.length === 0 ? (
                    <div className="no-results">
                      <h3>No saved jobs</h3>
                      <p>Bookmark jobs to view them here</p>
                    </div>
                  ) : (
                    jobs
                      .filter(job => bookmarkedJobs.includes(job.id))
                      .map(job => (
                        <JobCard
                          key={job.id}
                          job={job}
                          onBookmark={handleBookmark}
                          isBookmarked={true}
                          onApply={handleApply}
                        />
                      ))
                  )}
                </div>
              </div>
            } />
          </Routes>
        </main>
        
        {showApplicationModal && selectedJob && (
          <ApplicationModal
            job={selectedJob}
            onClose={() => setShowApplicationModal(false)}
            onSubmit={handleApplicationSubmit}
          />
        )}
        
        <footer>
          <div className="footer-content">
            <div className="footer-section">
              <h3>JobFlow</h3>
              <p>Connecting talent with opportunity</p>
            </div>
            <div className="footer-section">
              <h4>For Job Seekers</h4>
              <a href="/jobs">Browse Jobs</a>
              <a href="/">Career Resources</a>
            </div>
            <div className="footer-section">
              <h4>For Employers</h4>
              <a href="/">Post a Job</a>
              <a href="/">Find Talent</a>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p><Mail size={16} /> contact@jobflow.com</p>
              <p><Phone size={16} /> (555) 123-4567</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 JobFlow. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;