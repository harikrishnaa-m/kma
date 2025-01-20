const { check, body, validationResult } = require('express-validator')

const CSRIV = [

    check("isKmaMember").optional().isBoolean().withMessage("isKmaMember must be a boolean"),

    check("membershipId").optional().isString().withMessage("membershipId must be a string"),

    check("organizationProfile.name")
        .exists({ checkFalsy: true })
        .withMessage("Organization name is required")
        .isString()
        .withMessage("Organization name must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()-]+$/)
        .withMessage("Organization name contains invalid characters"),

    check("organizationProfile.corporateOfficeLocation")
        .optional()
        .isString()
        .withMessage("Corporate Office Location must be a string"),

    check("organizationProfile.description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),

    check("organizationProfile.ownership")
        .optional()
        .isString()
        .withMessage("Ownership must be a string"),

    check("organizationProfile.yearOfEstablishment")
        .optional()
        .isInt({ min: 1900, max: new Date().getFullYear() })
        .withMessage("Year of Establishment must be a valid year"),

    check("organizationProfile.annualTurnoverFY2023_24")
        .optional()
        .isString()
        .withMessage("Annual Turnover for FY 2023-24 must be a string"),

    check("organizationProfile.totalEmployees")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Total Employees must be a positive integer"),

    check("organizationProfile.reportingSystem")
        .optional()
        .isString()
        .withMessage("Reporting System must be a string"),

    check("organizationProfile.certifications")
        .optional()
        .isString()
        .withMessage("Certifications must be a string"),

    check("csrPolicyAndPractice.salientFeatures")
        .optional()
        .isString()
        .withMessage("Salient Features must be a string"),

    check("csrPolicyAndPractice.csrCommittee")
        .optional()
        .isString()
        .withMessage("CSR Committee must be a string"),

    check("csrPolicyAndPractice.fundsAllocated")
        .optional()
        .isString()
        .withMessage("Funds Allocated must be a string"),

    check("csrPolicyAndPractice.projectsFY2023_24")
        .optional()
        .isString()
        .withMessage("Projects for FY 2023-24 must be a string"),

    check("csrPolicyAndPractice.awarenessPrograms")
        .optional()
        .isString()
        .withMessage("Awareness Programs must be a string"),

    check("csrPolicyAndPractice.auditSystem")
        .optional()
        .isString()
        .withMessage("Audit System must be a string"),

    check("csrPolicyAndPractice.csrReport")
        .optional()
        .isString()
        .withMessage("CSR Report must be a string"),

    check("csrPolicyAndPractice.accolades")
        .optional()
        .isString()
        .withMessage("Accolades must be a string"),

    body("attachments.csrProjectReport").optional().custom(value => {
        if (typeof value !== "object") {
            throw new Error("CSR Project Report must be an object");
        }
        return true;
    }),

    body("attachments.reportingSystemReport").optional().custom(value => {
        if (typeof value !== "object") {
            throw new Error("Reporting System Report must be an object");
        }
        return true;
    }),

    body("attachments.certificates").optional().isArray().withMessage("Certificates must be an array"),

    check("paymentDetails.mode")
        .optional()
        .isString()
        .withMessage("Payment Mode must be a string"),

    check("paymentDetails.amount")
        .optional()
        .isNumeric()
        .withMessage("Amount must be a number"),

    check("paymentDetails.amountWithGst")
        .optional()
        .isNumeric()
        .withMessage("Amount with GST must be a number"),

    check("paymentDetails.transactionId")
        .optional()
        .isString()
        .withMessage("Transaction ID must be a string"),

    check("paymentDetails.muid")
        .optional()
        .isString()
        .withMessage("MUID must be a string"),

    body("paymentDetails.receipt").optional().custom(value => {
        if (typeof value !== "object") {
            throw new Error("Receipt must be an object");
        }
        return true;
    }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Validation failed',
                error: errors.array(),
            });
        }
        next();
    },
]


const NGOIV = [
    check("isKmaMember").optional().isBoolean().withMessage("isKmaMember must be a boolean"),

    check("membershipId").optional().isString().withMessage("membershipId must be a string"),

    check("organizationProfile.name")
        .exists({ checkFalsy: true })
        .withMessage("Organization name is required")
        .isString()
        .withMessage("Organization name must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()-]+$/)
        .withMessage("Organization name contains invalid characters"),

    check("organizationProfile.description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),

    check("organizationProfile.yearOfEstablishment")
        .optional()
        .isInt({ min: 1900, max: new Date().getFullYear() })
        .withMessage("Year of Establishment must be a valid year"),

    check("organizationProfile.legalStatus")
        .optional()
        .isString()
        .withMessage("Legal Status must be a string"),

    check("organizationProfile.governingBodyDetails")
        .optional()
        .isString()
        .withMessage("Governing Body Details must be a string"),

    check("organizationProfile.thematicAreas")
        .optional()
        .isString()
        .withMessage("Thematic Areas must be a string"),

    check("organizationProfile.activeGeographies")
        .optional()
        .isString()
        .withMessage("Active Geographies must be a string"),

    body("projectDetails").optional().isArray().withMessage("Project Details must be an array"),

    body("projectDetails.*.name")
        .optional()
        .isString()
        .withMessage("Project name must be a string"),

    body("projectDetails.*.keyTheme")
        .optional()
        .isString()
        .withMessage("Key Theme must be a string"),

    body("projectDetails.*.sourceOfFunding")
        .optional()
        .isString()
        .withMessage("Source of Funding must be a string"),

    body("projectDetails.*.location")
        .optional()
        .isString()
        .withMessage("Location must be a string"),

    body("projectDetails.*.startDate")
        .optional()
        .isISO8601()
        .toDate()
        .withMessage("Start Date must be a valid ISO date"),

    body("projectDetails.*.endDate")
        .optional()
        .isISO8601()
        .toDate()
        .withMessage("End Date must be a valid ISO date"),

    body("projectDetails.*.duration.years")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Duration (years) must be a non-negative integer"),

    body("projectDetails.*.duration.months")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Duration (months) must be a non-negative integer"),

    body("projectDetails.*.duration.days")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Duration (days) must be a non-negative integer"),

    body("projectDetails.*.totalAmountSpent.fy_2020_21")
        .optional()
        .isString()
        .withMessage("FY 2020-21 amount must be a string"),

    body("projectDetails.*.totalAmountSpent.fy_2021_22")
        .optional()
        .isString()
        .withMessage("FY 2021-22 amount must be a string"),

    body("projectDetails.*.totalAmountSpent.fy_2022_23")
        .optional()
        .isString()
        .withMessage("FY 2022-23 amount must be a string"),

    body("projectDetails.*.totalAmountSpent.fy_2023_24")
        .optional()
        .isString()
        .withMessage("FY 2023-24 amount must be a string"),

    body("projectDetails.*.totalAmountSpent.total")
        .optional()
        .isString()
        .withMessage("Total amount must be a string"),

    body("projectDetails.*.needBaselineStudies")
        .optional()
        .isString()
        .withMessage("Baseline Studies must be a string"),

    body("projectDetails.*.concernsAddressed")
        .optional()
        .isString()
        .withMessage("Concerns Addressed must be a string"),

    body("projectDetails.*.objectiveAlignment")
        .optional()
        .isString()
        .withMessage("Objective Alignment must be a string"),

    body("projectDetails.*.stakeholders")
        .optional()
        .isString()
        .withMessage("Stakeholders must be a string"),

    body("projectDetails.*.totalBeneficiaries")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Total Beneficiaries must be a positive integer"),

    body("projectDetails.*.innovativeMethods")
        .optional()
        .isString()
        .withMessage("Innovative Methods must be a string"),

    body("projectDetails.*.donorMonitor")
        .optional()
        .isString()
        .withMessage("Donor Monitor must be a string"),

    body("projectDetails.*.impact")
        .optional()
        .isString()
        .withMessage("Impact must be a string"),

    body("projectDetails.*.impactAssessment.conducted")
        .optional()
        .isBoolean()
        .withMessage("Impact Assessment (conducted) must be a boolean"),

    body("projectDetails.*.impactAssessment.by")
        .optional()
        .isString()
        .withMessage("Impact Assessment (by) must be a string"),

    body("projectDetails.*.impactAssessment.thirdPartyAgencyName")
        .optional()
        .isString()
        .withMessage("Third Party Agency Name must be a string"),

    body("projectDetails.*.impactAssessment.report").optional().custom(value => {
        if (value && typeof value !== "object") {
            throw new Error("Impact Assessment Report must be an object");
        }
        return true;
    }),

    body("projectDetails.*.sustainabilityStrategy")
        .optional()
        .isString()
        .withMessage("Sustainability Strategy must be a string"),

    body("projectDetails.*.replicabilityProbability")
        .optional()
        .isString()
        .withMessage("Replicability Probability must be a string"),

    body("attachments.organizationProfile").optional().custom(value => {
        if (value && typeof value !== "object") {
            throw new Error("Organization Profile must be an object");
        }
        return true;
    }),

    body("attachments.csrPolicy").optional().custom(value => {
        if (value && typeof value !== "object") {
            throw new Error("CSR Policy must be an object");
        }
        return true;
    }),

    body("attachments.csrProjectReport").optional().custom(value => {
        if (value && typeof value !== "object") {
            throw new Error("CSR Project Report must be an object");
        }
        return true;
    }),

    body("attachments.impactAssessmentReport").optional().custom(value => {
        if (value && typeof value !== "object") {
            throw new Error("Impact Assessment Report must be an object");
        }
        return true;
    }),

    check("paymentDetails.mode")
        .optional()
        .isString()
        .withMessage("Payment Mode must be a string"),

    check("paymentDetails.amount")
        .optional()
        .isNumeric()
        .withMessage("Amount must be a number"),

    check("paymentDetails.amountWithGst")
        .optional()
        .isNumeric()
        .withMessage("Amount with GST must be a number"),

    check("paymentDetails.transactionId")
        .optional()
        .isString()
        .withMessage("Transaction ID must be a string"),

    check("paymentDetails.muid")
        .optional()
        .isString()
        .withMessage("MUID must be a string"),

    body("paymentDetails.receipt").optional().custom(value => {
        if (value && typeof value !== "object") {
            throw new Error("Receipt must be an object");
        }
        return true;
    }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Validation failed',
                error: errors.array(),
            });
        }
        next();
    },
]


const SEIV = [
    check("isKmaMember").optional().isBoolean().withMessage("isKmaMember must be a boolean"),

    check("membershipId").optional().isString().withMessage("membershipId must be a string"),

    check("organizationProfile.name")
        .exists({ checkFalsy: true })
        .withMessage("Organization name is required")
        .isString()
        .withMessage("Organization name must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()-]+$/)
        .withMessage("Organization name contains invalid characters"),

    check("organizationProfile.corporateOfficeLocation")
        .optional()
        .isString()
        .withMessage("Corporate Office Location must be a string"),

    check("organizationProfile.briefDescription")
        .optional()
        .isString()
        .withMessage("Brief Description must be a string"),

    check("organizationProfile.ownershipDetails")
        .optional()
        .isString()
        .withMessage("Ownership Details must be a string"),

    check("organizationProfile.yearOfEstablishment")
        .optional()
        .isInt({ min: 1900, max: new Date().getFullYear() })
        .withMessage("Year of Establishment must be a valid year"),

    check("organizationProfile.annualTurnoverFY2023_24")
        .optional()
        .isString()
        .withMessage("Annual Turnover FY2023-24 must be a string"),

    check("organizationProfile.marketCapitalization")
        .optional()
        .isString()
        .withMessage("Market Capitalization must be a string"),

    check("organizationProfile.totalEmployees")
        .optional()
        .isString()
        .withMessage("Total Employees must be a string"),

    check("sustainabilityGovernance.integrationOfResponsibleBusiness")
        .optional()
        .isString()
        .withMessage("Integration of Responsible Business must be a string"),

    check("sustainabilityGovernance.esgTopics")
        .optional()
        .isString()
        .withMessage("ESG Topics must be a string"),

    check("sustainabilityGovernance.stakeholderEngagement")
        .optional()
        .isString()
        .withMessage("Stakeholder Engagement must be a string"),

    check("sustainabilityGovernance.seniorManagementResponsibilities")
        .optional()
        .isString()
        .withMessage("Senior Management Responsibilities must be a string"),

    check("sustainabilityGovernance.sustainabilityMeasurements")
        .optional()
        .isString()
        .withMessage("Sustainability Measurements must be a string"),

    check("sustainabilityGovernance.complianceProcess")
        .optional()
        .isString()
        .withMessage("Compliance Process must be a string"),

    check("sustainabilityGovernance.boardResponsibilities")
        .optional()
        .isString()
        .withMessage("Board Responsibilities must be a string"),

    check("sustainabilityIndicators.ghgFootprint")
        .optional()
        .isString()
        .withMessage("GHG Footprint must be a string"),

    check("sustainabilityIndicators.waterFootprint")
        .optional()
        .isString()
        .withMessage("Water Footprint must be a string"),

    check("sustainabilityIndicators.energyFootprint")
        .optional()
        .isString()
        .withMessage("Energy Footprint must be a string"),

    check("sustainabilityIndicators.wasteManagement")
        .optional()
        .isString()
        .withMessage("Waste Management must be a string"),

    check("sustainabilityIndicators.employeeWellBeing")
        .optional()
        .isString()
        .withMessage("Employee Well-Being must be a string"),

    check("sustainabilityIndicators.genderDiversity")
        .optional()
        .isString()
        .withMessage("Gender Diversity must be a string"),

    check("sustainabilityIndicators.inclusiveDevelopment")
        .optional()
        .isString()
        .withMessage("Inclusive Development must be a string"),

    check("sustainabilityIndicators.customerEngagement")
        .optional()
        .isString()
        .withMessage("Customer Engagement must be a string"),

    check("sustainabilityIndicators.openness")
        .optional()
        .isString()
        .withMessage("Openness must be a string"),

    check("sustainabilityFrameworks.adoptedFrameworks")
        .optional()
        .isString()
        .withMessage("Adopted Frameworks must be a string"),

    check("sustainabilityFrameworks.isoStandards")
        .optional()
        .isString()
        .withMessage("ISO Standards must be a string"),

    check("sustainabilityFrameworks.officeStandards")
        .optional()
        .isString()
        .withMessage("Office Standards must be a string"),

    check("sustainabilityFrameworks.thirdPartyAssurance")
        .optional()
        .isString()
        .withMessage("Third-Party Assurance must be a string"),

    check("sustainabilityFrameworks.innovativePractices")
        .optional()
        .isString()
        .withMessage("Innovative Practices must be a string"),

    check("sustainabilityFrameworks.awarenessInitiatives")
        .optional()
        .isString()
        .withMessage("Awareness Initiatives must be a string"),

    check("sustainabilityFrameworks.collaborativeInitiatives")
        .optional()
        .isString()
        .withMessage("Collaborative Initiatives must be a string"),

    check("sustainabilityFrameworks.significantAchievements")
        .optional()
        .isString()
        .withMessage("Significant Achievements must be a string"),

    check("sustainabilityFrameworks.publicCommitments")
        .optional()
        .isString()
        .withMessage("Public Commitments must be a string"),

    body("attachments.organizationProfile").optional().custom(value => {
        if (value && typeof value !== "object") {
            throw new Error("Organization Profile must be an object");
        }
        return true;
    }),

    body("attachments.sustainabilityReports").optional().custom(value => {
        if (value && typeof value !== "object") {
            throw new Error("Sustainability Reports must be an object");
        }
        return true;
    }),

    body("attachments.thirdPartyAssuranceReport").optional().custom(value => {
        if (value && typeof value !== "object") {
            throw new Error("Third-Party Assurance Report must be an object");
        }
        return true;
    }),

    body("attachments.supportingDocuments").optional().isArray().withMessage("Supporting Documents must be an array"),

    check("contactDetails.organizationName")
        .optional()
        .isString()
        .withMessage("Organization Name must be a string"),

    check("contactDetails.address")
        .optional()
        .isString()
        .withMessage("Address must be a string"),

    check("contactDetails.contactPerson")
        .optional()
        .isString()
        .withMessage("Contact Person must be a string"),

    check("contactDetails.mobileNumber")
        .optional()
        .isString()
        .isLength({ min: 10, max: 10 })
        .withMessage("Mobile Number must be a 10-digit string"),

    check("contactDetails.emailAddress")
        .optional()
        .isEmail()
        .withMessage("Email Address must be a valid email"),

    check("contactDetails.website")
        .optional()
        .isString()
        .withMessage("Website must be a string"),

    check("paymentDetails.mode")
        .optional()
        .isString()
        .withMessage("Payment Mode must be a string"),

    check("paymentDetails.amount")
        .optional()
        .isNumeric()
        .withMessage("Amount must be a number"),

    check("paymentDetails.amountWithGst")
        .optional()
        .isNumeric()
        .withMessage("Amount with GST must be a number"),

    check("paymentDetails.transactionId")
        .optional()
        .isString()
        .withMessage("Transaction ID must be a string"),

    check("paymentDetails.muid")
        .optional()
        .isString()
        .withMessage("MUID must be a string"),

    body("paymentDetails.receipt").optional().custom(value => {
        if (value && typeof value !== "object") {
            throw new Error("Receipt must be an object");
        }
        return true;
    }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Validation failed',
                error: errors.array(),
            });
        }
        next();
    },
]


const SSIV = [
    check("isKmaMember").optional().isBoolean().withMessage("isKmaMember must be a boolean"),

    check("membershipId").optional().isString().withMessage("membershipId must be a string"),

    check("organizationProfile.name")
        .exists({ checkFalsy: true })
        .withMessage("Organization name is required")
        .isString()
        .withMessage("Organization name must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()-]+$/)
        .withMessage("Organization name contains invalid characters"),

    check("organizationProfile.establishedDate")
        .optional()
        .isISO8601()
        .toDate()
        .withMessage("Established Date must be a valid ISO date"),

    check("organizationProfile.foundersAndTeam")
        .optional()
        .isString()
        .withMessage("Founders and Team must be a string"),

    check("organizationProfile.location")
        .optional()
        .isString()
        .withMessage("Location must be a string"),

    check("organizationProfile.contactPerson")
        .optional()
        .isString()
        .withMessage("Contact Person must be a string"),

    check("organizationProfile.mobile")
        .optional()
        .isString()
        .isLength({ min: 10, max: 10 })
        .withMessage("Mobile must be a 10-digit string"),

    check("organizationProfile.email")
        .optional()
        .isEmail()
        .withMessage("Email must be a valid email"),

    check("organizationProfile.website")
        .optional()
        .isString()
        .withMessage("Website must be a string"),

    check("generalOverview.description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),

    body("generalOverview.sdgsAddressed")
        .optional()
        .isArray()
        .withMessage("SDGs Addressed must be an array")
        .custom((value) => {
            if (!value.every((item) => typeof item === "string")) {
                throw new Error("Each SDG Addressed must be a string");
            }
            return true;
        }),

    check("businessModel.primaryProductOrService")
        .optional()
        .isString()
        .withMessage("Primary Product or Service must be a string"),

    check("businessModel.uniqueValueProposition")
        .optional()
        .isString()
        .withMessage("Unique Value Proposition must be a string"),

    check("businessModel.primaryCustomersOrBeneficiaries")
        .optional()
        .isString()
        .withMessage("Primary Customers or Beneficiaries must be a string"),

    check("businessModel.revenueModel")
        .optional()
        .isString()
        .withMessage("Revenue Model must be a string"),

    check("businessModel.startupStage")
        .optional()
        .isString()
        .withMessage("Startup Stage must be a string"),

    check("sustainabilityImpact.positiveImpact")
        .optional()
        .isString()
        .withMessage("Positive Impact must be a string"),

    check("sustainabilityImpact.longTermImpact")
        .optional()
        .isString()
        .withMessage("Long-Term Impact must be a string"),

    check("innovation.technologiesOrProcesses")
        .optional()
        .isString()
        .withMessage("Technologies or Processes must be a string"),

    check("innovation.scalability")
        .optional()
        .isString()
        .withMessage("Scalability must be a string"),

    check("innovation.approach")
        .optional()
        .isString()
        .withMessage("Approach must be a string"),

    check("marketAndFinancials.targetMarketSize")
        .optional()
        .isString()
        .withMessage("Target Market Size must be a string"),

    check("marketAndFinancials.annualRevenueOrFunding")
        .optional()
        .isString()
        .withMessage("Annual Revenue or Funding must be a string"),

    check("marketAndFinancials.partnerships")
        .optional()
        .isString()
        .withMessage("Partnerships must be a string"),

    check("marketAndFinancials.grantsAwardsRecognitions")
        .optional()
        .isString()
        .withMessage("Grants, Awards, or Recognitions must be a string"),

    check("challengesAndGrowth.majorChallenges")
        .optional()
        .isString()
        .withMessage("Major Challenges must be a string"),

    check("challengesAndGrowth.supportNeeded")
        .optional()
        .isString()
        .withMessage("Support Needed must be a string"),

    check("teamAndGovernance.teamDiversity")
        .optional()
        .isString()
        .withMessage("Team Diversity must be a string"),

    check("teamAndGovernance.governanceStructure")
        .optional()
        .isString()
        .withMessage("Governance Structure must be a string"),

    body("attachments.businessPlan").optional().custom((value) => {
        if (value && typeof value !== "object") {
            throw new Error("Business Plan must be an object");
        }
        return true;
    }),

    body("attachments.certifications").optional().custom((value) => {
        if (value && typeof value !== "object") {
            throw new Error("Certifications must be an object");
        }
        return true;
    }),

    body("attachments.testimonialsOrCaseStudies").optional().custom((value) => {
        if (value && typeof value !== "object") {
            throw new Error("Testimonials or Case Studies must be an object");
        }
        return true;
    }),

    body("attachments.impactMetrics").optional().custom((value) => {
        if (value && typeof value !== "object") {
            throw new Error("Impact Metrics must be an object");
        }
        return true;
    }),

    check("paymentDetails.mode")
        .optional()
        .isString()
        .withMessage("Payment Mode must be a string"),

    check("paymentDetails.amount")
        .optional()
        .isNumeric()
        .withMessage("Amount must be a number"),

    check("paymentDetails.amountWithGst")
        .optional()
        .isNumeric()
        .withMessage("Amount with GST must be a number"),

    check("paymentDetails.transactionId")
        .optional()
        .isString()
        .withMessage("Transaction ID must be a string"),

    check("paymentDetails.muid")
        .optional()
        .isString()
        .withMessage("MUID must be a string"),

    body("paymentDetails.receipt").optional().custom((value) => {
        if (value && typeof value !== "object") {
            throw new Error("Receipt must be an object");
        }
        return true;
    }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Validation failed',
                error: errors.array(),
            });
        }
        next();
    },
]

module.exports = { CSRIV, NGOIV, SEIV, SSIV }