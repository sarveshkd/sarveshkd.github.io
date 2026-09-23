export const profile = {
  name: "Sarvesh Kurhade",
  /** Public path to a portrait. Left empty until a photo is added. */
  photo: null as string | null,
  role: "Cloud engineer & ServiceNow developer",
  location: "Toronto, Ontario",
  availability: "Open to IT roles",
  email: "sarveshkurhade30@gmail.com",
  summary:
    "I build reliable cloud systems and ServiceNow workflows, and I bring applied AI in where it earns a place in the product.",
}

export const heroFacts = [
  { label: "Focus", value: "Cloud, workflow, AI" },
  { label: "Platform role", value: "2021–2022" },
  { label: "Study", value: "AI + cybersecurity" },
]

export const chapters = [
  {
    index: "01",
    kicker: "Platform",
    title: "Cloud systems that stay out of the way.",
    body: "AWS, Azure, Google Cloud, containers, and delivery pipelines. The goal is an environment a team can ship into without ceremony.",
  },
  {
    index: "02",
    kicker: "Workflow",
    title: "ServiceNow, where the work actually moves.",
    body: "Certified System Administrator. Platform configuration, scripting, and process support so requests are not living in inboxes.",
  },
  {
    index: "03",
    kicker: "Intelligence",
    title: "Applied models, tied to a real surface.",
    body: "Graduate study in artificial intelligence and cybersecurity, plus VirtualArch: architectural image synthesis from CycleGAN through ControlNet.",
  },
]

export const capabilities = [
  {
    index: "01",
    cluster: "Cloud platforms",
    approach: "AWS, Azure, Google Cloud",
    purpose:
      "Choose where a system lives, how its environments are separated, and how services stay reachable.",
  },
  {
    index: "02",
    cluster: "Delivery",
    approach: "Docker, Kubernetes, Jenkins, Git",
    purpose:
      "Turn a change into a running service with repeatable builds, containers, and a path to deploy.",
  },
  {
    index: "03",
    cluster: "ServiceNow",
    approach: "CSA, configuration, scripting",
    purpose:
      "Shape enterprise workflow: the records, the routing, and the logic between a request and a result.",
  },
  {
    index: "04",
    cluster: "Application code",
    approach: "Python, Java, JavaScript, SQL, REST, Flask",
    purpose:
      "Write the scripts, services, and queries that sit beside the platform and talk to it cleanly.",
  },
  {
    index: "05",
    cluster: "Applied AI",
    approach: "TensorFlow, PyTorch, OpenCV, Spark, Kafka",
    purpose:
      "Train and move models, work with vision, and keep data flowing when a project needs more than a form.",
  },
  {
    index: "06",
    cluster: "Security study",
    approach: "Cybersecurity graduate certificate",
    purpose:
      "Read risk next to cloud and platform decisions, instead of treating it as a separate slide.",
  },
]

export const experience = [
  {
    org: "LTIMindtree",
    dates: "Sep 2021 – Dec 2022",
    role: "Cloud engineer / ServiceNow",
    body: "Enterprise cloud exposure, platform configuration, scripting, and process support around ServiceNow-centered delivery. This is the lead technical chapter.",
  },
  {
    org: "Operations leadership",
    dates: "Supporting experience",
    role: "Restaurant and service operations",
    body: "Scheduling, training, and service standards under pressure. It stays on the record as proof of coordination, behind the technical identity.",
  },
]

export const credentials = [
  {
    kind: "Graduate certificate",
    title: "Artificial Intelligence",
    note: "Supports the modeling and experimentation behind project work.",
  },
  {
    kind: "Graduate certificate",
    title: "Cybersecurity",
    note: "Broadens the systems story with risk and defensive awareness.",
  },
  {
    kind: "Bachelor's degree",
    title: "Computer Science",
    note: "The foundation under cloud, development, and applied AI.",
  },
  {
    kind: "Certification",
    title: "ServiceNow CSA",
    note: "The credential that ties platform study to roles recruiters search for.",
  },
]

export const projects = [
  {
    featured: true,
    meta: "Featured project",
    field: "AI / computer vision",
    title: "VirtualArch",
    body: "An architectural image-synthesis project. It explores how generative models can reinterpret building photographs and drawings, from paired image translation into diffusion with structural control.",
    tags: ["VGG19", "CycleGAN", "Pix2Pix", "Stable Diffusion", "SDXL", "ControlNet"],
  },
  {
    featured: false,
    meta: "Professional work",
    field: "Cloud & workflow",
    title: "Enterprise delivery",
    body: "Cloud engineering and ServiceNow-centered delivery at LTIMindtree: platform configuration, scripting, and the process around how work moves through an enterprise system.",
    tags: ["AWS", "Azure", "ServiceNow", "Scripting"],
  },
]

export const nav = [
  { href: "#about", label: "About" },
  { href: "#capabilities", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
]
