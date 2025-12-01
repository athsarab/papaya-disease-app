import { PapayaDisease, PapayaSeverity } from '../types';
import { AdviceContent } from '../components/AdviceCard';

type AdviceMap = Record<PapayaSeverity, AdviceContent>;
type AdviceOverrideMap = Partial<Record<PapayaSeverity, Partial<AdviceContent>>>;

const buildAdvice = (
  disease: PapayaDisease,
  severity: PapayaSeverity,
  details: Partial<AdviceContent>,
): AdviceContent => ({
  title: details.title ?? `${disease} (${severity})`,
  description:
    details.description || 'Monitor plants closely and adjust irrigation, pruning, and hygiene.',
  actions: details.actions || ['Keep monitoring and maintain field hygiene.'],
});

const createSeverityAdvice = (
  disease: PapayaDisease,
  overrides: AdviceOverrideMap = {},
): AdviceMap => {
  const severities: PapayaSeverity[] = ['mild', 'moderate', 'severe', 'unknown'];
  return severities.reduce((acc, severity) => {
    acc[severity] = buildAdvice(disease, severity, overrides[severity] ?? {});
    return acc;
  }, {} as AdviceMap);
};

const adviceLibrary: Record<PapayaDisease, AdviceMap> = {
  Anthracnose: createSeverityAdvice('Anthracnose', {
    mild: {
      title: 'Anthracnose (early spots)',
      description: 'Tiny sunken spots visible. Stop splash irrigation and prune infected leaves.',
      actions: [
        'Remove and destroy spotted leaves.',
        'Spray copper fungicide every 10 days if rain persists.',
        'Improve air circulation between plants.',
      ],
    },
    moderate: {
      title: 'Anthracnose (spreading)',
      description: 'Lesions expanding with orange spores. Reduce humidity immediately.',
      actions: [
        'Apply systemic + contact fungicide rotation (e.g., azoxystrobin + copper).',
        'Harvest ripe fruits promptly.',
        'Sanitize tools with bleach solution.',
      ],
    },
    severe: {
      title: 'Anthracnose (severe)',
      description: 'Severe blight. High risk of fruit loss.',
      actions: [
        'Remove heavily infected trees if feasible.',
        'Alternate fungicides every 7 days.',
        'Consult extension officer for resistant varieties.',
      ],
    },
  }),
  Curl: createSeverityAdvice('Curl', {
    mild: {
      description: 'Edges curling slightly. Often linked to vectors.',
      actions: [
        'Scout for aphids and whiteflies.',
        'Use yellow sticky traps to monitor vectors.',
        'Apply neem-based spray early morning.',
      ],
    },
    moderate: {
      description: 'Noticeable distortion. Nutrient uptake impacted.',
      actions: [
        'Introduce recommended systemic insecticide rotation.',
        'Remove most affected shoots.',
        'Feed plants with balanced foliar nutrients.',
      ],
    },
    severe: {
      description: 'Severe curling and stunting.',
      actions: [
        'Rogue out severely infected plants to stop spread.',
        'Maintain strict vector management every 5 days.',
        'Rotate host crops where possible.',
      ],
    },
  }),
  Healthy: createSeverityAdvice('Healthy', {
    mild: {
      description: 'Leaf looks healthy. Continue good practices.',
      actions: [
        'Keep monitoring weekly.',
        'Maintain balanced fertilization and sanitation.',
        'Mulch soil to conserve moisture.',
      ],
    },
    moderate: {
      description: 'Leaf healthy. Stay vigilant.',
      actions: ['No treatment needed.'],
    },
    severe: {
      description: 'Leaf healthy. No treatment required.',
      actions: ['Celebrate healthy growth!'],
    },
  }),
  'Mite disease': createSeverityAdvice('Mite disease', {
    mild: {
      description: 'Fine webbing or bronzing on few leaves.',
      actions: [
        'Spray sulfur or soap solution under leaves.',
        'Avoid dusty conditions—mist roads and paths.',
        'Encourage natural predators by planting borders.',
      ],
    },
    moderate: {
      description: 'Bronzing spreading quickly.',
      actions: [
        'Rotate acaricides (abamectin, spiromesifen) per label.',
        'Remove severely damaged leaves.',
        'Irrigate during morning to knock mites off.',
      ],
    },
    severe: {
      description: 'Leaves scorched and curled inward.',
      actions: [
        'Apply strong miticide rotation every 5 days.',
        'Consider pruning affected canopy.',
        'Consult extension officer for emergency plan.',
      ],
    },
  }),
  Ringspot: createSeverityAdvice('Ringspot', {
    mild: {
      description: 'Small mosaic or faint rings. Virus likely recent.',
      actions: [
        'Remove nearby cucurbits that host vectors.',
        'Control aphids with mineral oil sprays.',
        'Destroy weeds bordering the plot.',
      ],
    },
    moderate: {
      description: 'Distinct rings. Growth slowdown starting.',
      actions: [
        'Rogue out infected plants if incidence low.',
        'Plant barrier crops (maize) to block aphids.',
        'Replant with tolerant varieties after sanitation.',
      ],
    },
    severe: {
      description: 'Severe mottling and deformed leaves.',
      actions: [
        'Remove and burn infected plants immediately.',
        'Delay replanting 30 days while destroying volunteers.',
        'Coordinate community-wide vector control.',
      ],
    },
  }),
  NotPapaya: createSeverityAdvice('NotPapaya', {
    mild: {
      title: 'Not a papaya leaf',
      description: 'Photo seems to be another crop.',
      actions: [
        'Retake photo focusing on a single papaya leaf.',
        'Ensure the entire leaf blade is visible.',
        'Avoid background clutter.',
      ],
    },
    moderate: {
      title: 'Not a papaya leaf',
      description: 'System cannot recognize this plant.',
      actions: ['Capture a clearer papaya leaf and retry.'],
    },
    severe: {
      title: 'Not a papaya leaf',
      description: 'Please provide a papaya leaf for diagnosis.',
      actions: ['Ask someone to hold the leaf steady and rescan.'],
    },
    unknown: {
      title: 'Not a papaya leaf',
      description: 'Unable to process this image.',
      actions: ['Retake the photo with better lighting.', 'Wipe camera lens before scanning.'],
    },
  }),
};

export const getAdviceFor = (
  disease: PapayaDisease,
  severity: PapayaSeverity,
): AdviceContent => adviceLibrary[disease]?.[severity] ?? adviceLibrary[disease]?.unknown;
