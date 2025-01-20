const { check, body, validationResult } = require('express-validator')

const CSRIV = [

    check("isKmaMember").optional().isBoolean().withMessage("isKmaMember must be a boolean"),

    check("membershipId").optional().isString().withMessage("membershipId must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Membership Id contains invalid characters"),

    check("organizationProfile.name")
        .exists({ checkFalsy: true })
        .withMessage("Organization name is required")
        .isString()
        .withMessage("Organization name must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Organization name contains invalid characters"),

    check("organizationProfile.corporateOfficeLocation")
        .optional()
        .isString()
        .withMessage("Corporate Office Location must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Corporate Office Location contains invalid characters"),

    check("organizationProfile.description")
        .optional()
        .isString()
        .withMessage("Description must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Description contains invalid characters"),

    check("organizationProfile.ownership")
        .optional()
        .isString()
        .withMessage("Ownership must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Ownership contains invalid characters"),

    check("organizationProfile.yearOfEstablishment")
        .optional()
        .isInt({ min: 1700, max: new Date().getFullYear() })
        .withMessage("Year of Establishment must be a valid year"),

    check("organizationProfile.annualTurnoverFY2023_24")
        .optional()
        .isString()
        .withMessage("Annual Turnover for FY 2023-24 must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Annual Turnover contains invalid characters"),

    check("organizationProfile.totalEmployees")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Total Employees must be a positive integer"),

    check("organizationProfile.reportingSystem")
        .optional()
        .isString()
        .withMessage("Reporting System must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Reporting System contains invalid characters"),

    check("organizationProfile.certifications")
        .optional()
        .isString()
        .withMessage("Certifications must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Certifications contains invalid characters"),

    check("csrPolicyAndPractice.salientFeatures")
        .optional()
        .isString()
        .withMessage("Salient Features must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Salient Features contains invalid characters"),

    check("csrPolicyAndPractice.csrCommittee")
        .optional()
        .isString()
        .withMessage("CSR Committee must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("CSR Committee contains invalid characters"),

    check("csrPolicyAndPractice.fundsAllocated")
        .optional()
        .isString()
        .withMessage("Funds Allocated must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Funds Allocated contains invalid characters"),

    check("csrPolicyAndPractice.projectsFY2023_24")
        .optional()
        .isString()
        .withMessage("Projects for FY 2023-24 must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Projects for FY 2023-24 contains invalid characters"),

    check("csrPolicyAndPractice.awarenessPrograms")
        .optional()
        .isString()
        .withMessage("Awareness Programs must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Awareness Programs contains invalid characters"),

    check("csrPolicyAndPractice.auditSystem")
        .optional()
        .isString()
        .withMessage("Audit System must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Audit System contains invalid characters"),

    check("csrPolicyAndPractice.csrReport")
        .optional()
        .isString()
        .withMessage("CSR Report must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("CSR Report contains invalid characters"),

    check("csrPolicyAndPractice.accolades")
        .optional()
        .isString()
        .withMessage("Accolades must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Accolades contains invalid characters"),

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
        .withMessage("Payment Mode must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Payment Mode contains invalid characters"),

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
        .withMessage("Transaction ID must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Transaction ID contains invalid characters"),

    check("paymentDetails.muid")
        .optional()
        .isString()
        .withMessage("MUID must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("MUID contains invalid characters"),

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

    check("membershipId").optional().isString().withMessage("membershipId must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Membership Id contains invalid characters"),

    check("organizationProfile.name")
        .exists({ checkFalsy: true })
        .withMessage("Organization name is required")
        .isString()
        .withMessage("Organization name must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Organization name contains invalid characters"),

    check("organizationProfile.description")
        .optional()
        .isString()
        .withMessage("Description must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Description name contains invalid characters"),

    check("organizationProfile.yearOfEstablishment")
        .optional()
        .isInt({ min: 1700, max: new Date().getFullYear() })
        .withMessage("Year of Establishment must be a valid year"),

    check("organizationProfile.legalStatus")
        .optional()
        .isString()
        .withMessage("Legal Status must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Legal Status contains invalid characters"),

    check("organizationProfile.governingBodyDetails")
        .optional()
        .isString()
        .withMessage("Governing Body Details must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Governing Body Details contains invalid characters"),

    check("organizationProfile.thematicAreas")
        .optional()
        .isString()
        .withMessage("Thematic Areas must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Thematic Areas contains invalid characters"),

    check("organizationProfile.activeGeographies")
        .optional()
        .isString()
        .withMessage("Active Geographies must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Active Geographies contains invalid characters"),

    body("projectDetails").optional().isArray().withMessage("Project Details must be an array"),

    body("projectDetails.*.name")
        .optional()
        .isString()
        .withMessage("Project name must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Project name contains invalid characters"),

    body("projectDetails.*.keyTheme")
        .optional()
        .isString()
        .withMessage("Key Theme must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Key Theme contains invalid characters"),

    body("projectDetails.*.sourceOfFunding")
        .optional()
        .isString()
        .withMessage("Source of Funding must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Source of Funding contains invalid characters"),

    body("projectDetails.*.location")
        .optional()
        .isString()
        .withMessage("Location must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Location contains invalid characters"),

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
        .withMessage("FY 2020-21 amount must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("FY 2020-21 amount contains invalid characters"),

    body("projectDetails.*.totalAmountSpent.fy_2021_22")
        .optional()
        .isString()
        .withMessage("FY 2021-22 amount must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("FY 2021-22 amount contains invalid characters"),

    body("projectDetails.*.totalAmountSpent.fy_2022_23")
        .optional()
        .isString()
        .withMessage("FY 2022-23 amount must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("FY 2022-23 amount contains invalid characters"),

    body("projectDetails.*.totalAmountSpent.fy_2023_24")
        .optional()
        .isString()
        .withMessage("FY 2023-24 amount must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("FY 2023-24 amount contains invalid characters"),

    body("projectDetails.*.totalAmountSpent.total")
        .optional()
        .isString()
        .withMessage("Total amount must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Total amount contains invalid characters"),

    body("projectDetails.*.needBaselineStudies")
        .optional()
        .isString()
        .withMessage("Baseline Studies must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Baseline Studies contains invalid characters"),

    body("projectDetails.*.concernsAddressed")
        .optional()
        .isString()
        .withMessage("Concerns Addressed must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Concerns Addressed contains invalid characters"),

    body("projectDetails.*.objectiveAlignment")
        .optional()
        .isString()
        .withMessage("Objective Alignment must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Objective Alignment contains invalid characters"),

    body("projectDetails.*.stakeholders")
        .optional()
        .isString()
        .withMessage("Stakeholders must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Stakeholders contains invalid characters"),

    body("projectDetails.*.totalBeneficiaries")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Total Beneficiaries must be a positive integer"),

    body("projectDetails.*.innovativeMethods")
        .optional()
        .isString()
        .withMessage("Innovative Methods must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Innovative Methods contains invalid characters"),

    body("projectDetails.*.donorMonitor")
        .optional()
        .isString()
        .withMessage("Donor Monitor must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Donor Monitor contains invalid characters"),

    body("projectDetails.*.impact")
        .optional()
        .isString()
        .withMessage("Impact must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Impact contains invalid characters"),

    body("projectDetails.*.impactAssessment.conducted")
        .optional()
        .isBoolean()
        .withMessage("Impact Assessment (conducted) must be a boolean"),

    body("projectDetails.*.impactAssessment.by")
        .optional()
        .isString()
        .withMessage("Impact Assessment (by) must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Impact Assessment contains invalid characters"),

    body("projectDetails.*.impactAssessment.thirdPartyAgencyName")
        .optional()
        .isString()
        .withMessage("Third Party Agency Name must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Third Party Agency Name contains invalid characters"),

    body("projectDetails.*.impactAssessment.report").optional().custom(value => {
        if (value && typeof value !== "object") {
            throw new Error("Impact Assessment Report must be an object");
        }
        return true;
    }),

    body("projectDetails.*.sustainabilityStrategy")
        .optional()
        .isString()
        .withMessage("Sustainability Strategy must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Sustainability Strategy contains invalid characters"),

    body("projectDetails.*.replicabilityProbability")
        .optional()
        .isString()
        .withMessage("Replicability Probability must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Replicability Probability contains invalid characters"),

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
        .withMessage("Payment Mode must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Payment Mode contains invalid characters"),

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
        .withMessage("Transaction ID must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Transaction ID contains invalid characters"),

    check("paymentDetails.muid")
        .optional()
        .isString()
        .withMessage("MUID must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("MUID contains invalid characters"),

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

    check("membershipId").optional().isString().withMessage("membershipId must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Membership Id contains invalid characters"),

    check("organizationProfile.name")
        .exists({ checkFalsy: true })
        .withMessage("Organization name is required")
        .isString()
        .withMessage("Organization name must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Organization name contains invalid characters"),

    check("organizationProfile.corporateOfficeLocation")
        .optional()
        .isString()
        .withMessage("Corporate Office Location must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Corporate Office Location contains invalid characters"),

    check("organizationProfile.briefDescription")
        .optional()
        .isString()
        .withMessage("Brief Description must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Brief Description contains invalid characters"),

    check("organizationProfile.ownershipDetails")
        .optional()
        .isString()
        .withMessage("Ownership Details must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Ownership Details contains invalid characters"),

    check("organizationProfile.yearOfEstablishment")
        .optional()
        .isInt({ min: 1700, max: new Date().getFullYear() })
        .withMessage("Year of Establishment must be a valid year"),

    check("organizationProfile.annualTurnoverFY2023_24")
        .optional()
        .isString()
        .withMessage("Annual Turnover FY2023-24 must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Annual Turnover FY2023-24 contains invalid characters"),

    check("organizationProfile.marketCapitalization")
        .optional()
        .isString()
        .withMessage("Market Capitalization must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Market Capitalization contains invalid characters"),

    check("organizationProfile.totalEmployees")
        .optional()
        .isNumeric()
        .withMessage("Total Employees must be a number")
        .custom((value) => {
            if (value < 0) {
                throw new Error("Total Employees must be a positive number");
            }
            return true;
        }),

    check("sustainabilityGovernance.integrationOfResponsibleBusiness")
        .optional()
        .isString()
        .withMessage("Integration of Responsible Business must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Integration of Responsible Business contains invalid characters"),

    check("sustainabilityGovernance.esgTopics")
        .optional()
        .isString()
        .withMessage("ESG Topics must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("ESG Topics contains invalid characters"),

    check("sustainabilityGovernance.stakeholderEngagement")
        .optional()
        .isString()
        .withMessage("Stakeholder Engagement must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Stakeholder Engagement contains invalid characters"),

    check("sustainabilityGovernance.seniorManagementResponsibilities")
        .optional()
        .isString()
        .withMessage("Senior Management Responsibilities must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Senior Management Responsibilities contains invalid characters"),

    check("sustainabilityGovernance.sustainabilityMeasurements")
        .optional()
        .isString()
        .withMessage("Sustainability Measurements must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Sustainability Measurements contains invalid characters"),

    check("sustainabilityGovernance.complianceProcess")
        .optional()
        .isString()
        .withMessage("Compliance Process must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Compliance Process contains invalid characters"),

    check("sustainabilityGovernance.boardResponsibilities")
        .optional()
        .isString()
        .withMessage("Board Responsibilities must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Board Responsibilities contains invalid characters"),

    check("sustainabilityIndicators.ghgFootprint")
        .optional()
        .isString()
        .withMessage("GHG Footprint must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("GHG Footprint contains invalid characters"),

    check("sustainabilityIndicators.waterFootprint")
        .optional()
        .isString()
        .withMessage("Water Footprint must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Water Footprint contains invalid characters"),

    check("sustainabilityIndicators.energyFootprint")
        .optional()
        .isString()
        .withMessage("Energy Footprint must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Energy Footprint contains invalid characters"),

    check("sustainabilityIndicators.wasteManagement")
        .optional()
        .isString()
        .withMessage("Waste Management must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Waste Management contains invalid characters"),

    check("sustainabilityIndicators.employeeWellBeing")
        .optional()
        .isString()
        .withMessage("Employee Well-Being must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Employee Well-Being contains invalid characters"),

    check("sustainabilityIndicators.genderDiversity")
        .optional()
        .isString()
        .withMessage("Gender Diversity must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Gender Diversity contains invalid characters"),

    check("sustainabilityIndicators.inclusiveDevelopment")
        .optional()
        .isString()
        .withMessage("Inclusive Development must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Inclusive Development contains invalid characters"),

    check("sustainabilityIndicators.customerEngagement")
        .optional()
        .isString()
        .withMessage("Customer Engagement must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Customer Engagement contains invalid characters"),

    check("sustainabilityIndicators.openness")
        .optional()
        .isString()
        .withMessage("Openness must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Openness contains invalid characters"),

    check("sustainabilityFrameworks.adoptedFrameworks")
        .optional()
        .isString()
        .withMessage("Adopted Frameworks must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Adopted Frameworks contains invalid characters"),

    check("sustainabilityFrameworks.isoStandards")
        .optional()
        .isString()
        .withMessage("ISO Standards must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("ISO Standards contains invalid characters"),

    check("sustainabilityFrameworks.officeStandards")
        .optional()
        .isString()
        .withMessage("Office Standards must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Office Standards contains invalid characters"),

    check("sustainabilityFrameworks.thirdPartyAssurance")
        .optional()
        .isString()
        .withMessage("Third-Party Assurance must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Third-Party Assurance contains invalid characters"),

    check("sustainabilityFrameworks.innovativePractices")
        .optional()
        .isString()
        .withMessage("Innovative Practices must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Innovative Practices contains invalid characters"),

    check("sustainabilityFrameworks.awarenessInitiatives")
        .optional()
        .isString()
        .withMessage("Awareness Initiatives must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Awareness Initiatives contains invalid characters"),

    check("sustainabilityFrameworks.collaborativeInitiatives")
        .optional()
        .isString()
        .withMessage("Collaborative Initiatives must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Collaborative Initiatives contains invalid characters"),

    check("sustainabilityFrameworks.significantAchievements")
        .optional()
        .isString()
        .withMessage("Significant Achievements must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Significant Achievements contains invalid characters"),

    check("sustainabilityFrameworks.publicCommitments")
        .optional()
        .isString()
        .withMessage("Public Commitments must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Public Commitments contains invalid characters"),

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
        .withMessage("Organization Name must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Organization name contains invalid characters"),

    check("contactDetails.address")
        .optional()
        .isString()
        .withMessage("Address must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Address contains invalid characters"),

    check("contactDetails.contactPerson")
        .optional()
        .isString()
        .withMessage("Contact Person must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Contact Person contains invalid characters"),

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
        .withMessage("Payment Mode must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Payment Mode contains invalid characters"),

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
        .withMessage("Transaction ID must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Transaction ID contains invalid characters"),

    check("paymentDetails.muid")
        .optional()
        .isString()
        .withMessage("MUID must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("MUID contains invalid characters"),

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

    check("membershipId").optional().isString().withMessage("membershipId must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Membership Id contains invalid characters"),

    check("organizationProfile.name")
        .exists({ checkFalsy: true })
        .withMessage("Organization name is required")
        .isString()
        .withMessage("Organization name must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Organization name contains invalid characters"),

    check("organizationProfile.establishedDate")
        .optional()
        .isISO8601()
        .toDate()
        .withMessage("Established Date must be a valid ISO date"),

    check("organizationProfile.foundersAndTeam")
        .optional()
        .isString()
        .withMessage("Founders and Team must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Founders and Team contains invalid characters"),

    check("organizationProfile.location")
        .optional()
        .isString()
        .withMessage("Location must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Location contains invalid characters"),

    check("organizationProfile.contactPerson")
        .optional()
        .isString()
        .withMessage("Contact Person must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Contact Person contains invalid characters"),

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
        .withMessage("Description must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Description contains invalid characters"),

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
        .withMessage("Primary Product or Service must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Primary Product or Service contains invalid characters"),

    check("businessModel.uniqueValueProposition")
        .optional()
        .isString()
        .withMessage("Unique Value Proposition must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Unique Value Proposition contains invalid characters"),

    check("businessModel.primaryCustomersOrBeneficiaries")
        .optional()
        .isString()
        .withMessage("Primary Customers or Beneficiaries must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Primary Customers or Beneficiaries contains invalid characters"),

    check("businessModel.revenueModel")
        .optional()
        .isString()
        .withMessage("Revenue Model must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Revenue Model contains invalid characters"),

    check("businessModel.startupStage")
        .optional()
        .isString()
        .withMessage("Startup Stage must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Startup Stage contains invalid characters"),

    check("sustainabilityImpact.positiveImpact")
        .optional()
        .isString()
        .withMessage("Positive Impact must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Positive Impact contains invalid characters"),

    check("sustainabilityImpact.longTermImpact")
        .optional()
        .isString()
        .withMessage("Long-Term Impact must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Long-Term Impact contains invalid characters"),

    check("innovation.technologiesOrProcesses")
        .optional()
        .isString()
        .withMessage("Technologies or Processes must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Technologies or Processes contains invalid characters"),

    check("innovation.scalability")
        .optional()
        .isString()
        .withMessage("Scalability must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Scalability contains invalid characters"),

    check("innovation.approach")
        .optional()
        .isString()
        .withMessage("Approach must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Approach contains invalid characters"),

    check("marketAndFinancials.targetMarketSize")
        .optional()
        .isString()
        .withMessage("Target Market Size must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Target Market Size contains invalid characters"),

    check("marketAndFinancials.annualRevenueOrFunding")
        .optional()
        .isString()
        .withMessage("Annual Revenue or Funding must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Annual Revenue or Funding contains invalid characters"),

    check("marketAndFinancials.partnerships")
        .optional()
        .isString()
        .withMessage("Partnerships must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Partnerships contains invalid characters"),

    check("marketAndFinancials.grantsAwardsRecognitions")
        .optional()
        .isString()
        .withMessage("Grants, Awards, or Recognitions must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Grants, Awards, or Recognitions contains invalid characters"),

    check("challengesAndGrowth.majorChallenges")
        .optional()
        .isString()
        .withMessage("Major Challenges must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Major Challenges contains invalid characters"),

    check("challengesAndGrowth.supportNeeded")
        .optional()
        .isString()
        .withMessage("Support Needed must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Support Needed contains invalid characters"),

    check("teamAndGovernance.teamDiversity")
        .optional()
        .isString()
        .withMessage("Team Diversity must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Team Diversity contains invalid characters"),

    check("teamAndGovernance.governanceStructure")
        .optional()
        .isString()
        .withMessage("Governance Structure must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Governance Structure contains invalid characters"),

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
        .withMessage("Payment Mode must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Payment Mode contains invalid characters"),

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
        .withMessage("Transaction ID must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("Transaction ID contains invalid characters"),

    check("paymentDetails.muid")
        .optional()
        .isString()
        .withMessage("MUID must be a string")
        .matches(/^[a-zA-Z0-9\s.,&()'"-]+$/)
        .withMessage("MUID contains invalid characters"),

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