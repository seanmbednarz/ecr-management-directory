export type DeptKey = 'management' | 'construction';

export interface Dept {
  label: string;
  color: string;
}

export interface Person {
  id: string;
  name: string;
  cred: string;
  title: string;
  dept: DeptKey;
  parent: string | null;
  email: string;
  phone: string;
  mobile: string;
  linkedin: string;
  photo: string;
  bio: string;
  color: string;
}

const BIO = (s: string) => `https://www.ecrtx.com/team/${s}/`;
const LI  = (s: string) => `https://www.linkedin.com/in/${s}`;

export const PEOPLE: Person[] = [
  // --- Top of org ---
  { id: 'matt-levin', name: 'Matt Levin', cred: 'SIOR', title: 'Founder / Managing Partner', dept: 'management', parent: null,
    email: 'mlevin@ecrtx.com', phone: '512-505-0001', mobile: '512-733-4409', linkedin: LI('matt-levin-b7170613'),
    photo: '/Matt_Levin_-_Square.jpg', bio: BIO('matt-levin'), color: '#db2328' },

  // --- Property Management (under Matt Levin) ---
  { id: 'franziska-jackson', name: 'Franziska Jackson', cred: 'CPM, RPA, FMA, LEED AP O+M', title: 'Director of Property Management', dept: 'management', parent: 'matt-levin',
    email: 'fjackson@ecrtx.com', phone: '512-505-0013', mobile: '512-694-3093', linkedin: LI('franziska-jackson-cpm-rpa-fma-leed-ap-34072527'),
    photo: '/Franziska_Jackson_-_Square.jpg', bio: BIO('franziska-jackson'), color: '#db2328' },

  // --- Construction Management (under Matt Levin) ---
  { id: 'aaron-clemons', name: 'Aaron Clemons', cred: '', title: 'Director of Construction Management', dept: 'construction', parent: 'matt-levin',
    email: 'aclemons@ecrtx.com', phone: '512-505-0831', mobile: '', linkedin: LI('aaron-clemons-310366117'),
    photo: '/Aaron_Clemons_-_Square.jpg', bio: BIO('aaron-clemons'), color: '#879792' },

  { id: 'mike-bartz', name: 'Mike Bartz', cred: '', title: 'Chief Engineer', dept: 'management', parent: 'franziska-jackson',
    email: 'mbartz@ecrtx.com', phone: '', mobile: '512-497-8066', linkedin: '',
    photo: '/Mike_Bartz_-_Square.jpg', bio: BIO('mike-bartz'), color: '#879792' },
  { id: 'jackson-barr', name: 'Jackson Barr', cred: '', title: 'Maintenance Technician', dept: 'management', parent: 'mike-bartz',
    email: 'jbarr@ecrtx.com', phone: '512-505-2758', mobile: '512-550-3020', linkedin: '',
    photo: '/Jackson_Barr_-_Square.jpg', bio: BIO('jackson-barr'), color: '#879792' },
  { id: 'chris-pagan', name: 'Chris Pagan', cred: '', title: 'Maintenance Technician', dept: 'management', parent: 'mike-bartz',
    email: 'cpagan@ecrtx.com', phone: '512-505-2768', mobile: '512-947-8014', linkedin: '',
    photo: '/Chris_Pagan_-_Square.jpg', bio: BIO('chris-pagan'), color: '#879792' },
  { id: 'cesar-sanchez', name: 'Cesar Sanchez', cred: '', title: 'Building Engineer', dept: 'management', parent: 'mike-bartz',
    email: 'csanchez@ecrtx.com', phone: '512-505-2766', mobile: '512-545-4411', linkedin: '',
    photo: '/Cesar_Sanchez_-_Square.jpg', bio: BIO('cesar-sanchez'), color: '#879792' },
  { id: 'daniel-segura', name: 'Daniel Segura', cred: '', title: 'Building Engineer', dept: 'management', parent: 'mike-bartz',
    email: 'dsegura@ecrtx.com', phone: '512-505-9042', mobile: '512-815-6070', linkedin: '',
    photo: '/Daniel_Segura_-_Square.jpg', bio: BIO('daniel-segura'), color: '#879792' },
  { id: 'daniel-coupe', name: 'Daniel Coupe', cred: '', title: 'Building Engineer', dept: 'management', parent: 'mike-bartz',
    email: 'dcoupe@ecrtx.com', phone: '512-505-6214', mobile: '512-299-4430', linkedin: LI('daniel-c-coupe-ab2a1494'),
    photo: '/Daniel_Coupe_-_Square.jpg', bio: BIO('daniel-coupe'), color: '#879792' },
  { id: 'javier-esparza', name: 'Javier Esparza', cred: '', title: 'Building Engineer', dept: 'management', parent: 'mike-bartz',
    email: 'jesparza@ecrtx.com', phone: '512-505-2759', mobile: '512-961-2013', linkedin: '',
    photo: '/Javier_Esparza_-_Square.jpg', bio: BIO('javier-esparza'), color: '#879792' },
  { id: 'ryan-tamayo', name: 'Ryan Tamayo', cred: '', title: 'Building Engineer', dept: 'management', parent: 'mike-bartz',
    email: 'rtamayo@ecrtx.com', phone: '512-505-2764', mobile: '512-750-5945', linkedin: LI('ryan-tamayo-3279a5183'),
    photo: '/Ryan_Tamayo_-_Square.jpg', bio: BIO('ryan-tamayo'), color: '#879792' },
  { id: 'angel-garcia', name: 'Angel Garcia', cred: '', title: 'Building Engineer', dept: 'management', parent: 'mike-bartz',
    email: 'agarcia@ecrtx.com', phone: '512-505-0835', mobile: '512-921-7655', linkedin: '',
    photo: '/Angel_Garcia_-_Square.jpg', bio: BIO('angel-garcia'), color: '#879792' },
  { id: 'jose-vazquez', name: 'Jose Vazquez', cred: '', title: 'Building Engineer', dept: 'management', parent: 'mike-bartz',
    email: 'jvazquez@ecrtx.com', phone: '', mobile: '512-767-3468', linkedin: '',
    photo: '/Jose_Vazquez_-_Square.jpg', bio: BIO('jose-vazquez'), color: '#879792' },
  { id: 'samuel-betancourt', name: 'Samuel Betancourt', cred: '', title: 'Lead Engineer', dept: 'management', parent: 'mike-bartz',
    email: 'sbetancourt@ecrtx.com', phone: '512-505-2757', mobile: '512-560-4352', linkedin: '',
    photo: '/Samuel_Betancort_-_Square.jpg', bio: BIO('samuel-betancourt'), color: '#879792' },
  { id: 'jamie-tamayo', name: 'Jamie Tamayo', cred: '', title: 'Lead Engineer', dept: 'management', parent: 'mike-bartz',
    email: 'jtamayo@ecrtx.com', phone: '512-505-2763', mobile: '512-994-5032', linkedin: LI('jamie-tamayo-447149271'),
    photo: '/Jamie_Tamayo_-_Square.jpg', bio: BIO('jamie-tamayo'), color: '#879792' },

  { id: 'michelle-ackermann', name: 'Michelle Ackermann', cred: 'CPM, RPA', title: 'Associate Director', dept: 'management', parent: 'franziska-jackson',
    email: 'mackermann@ecrtx.com', phone: '512-505-0884', mobile: '512-284-6845', linkedin: LI('michelle-ackermann-cpm-rpa-a933a622'),
    photo: '/Michelle_Ackermann_-_Square.jpg', bio: BIO('michelle-ackermann'), color: '#f15825' },
  { id: 'danielle-ortiz', name: 'Danielle Ortiz', cred: '', title: 'Senior Property Manager', dept: 'management', parent: 'franziska-jackson',
    email: 'dortiz@ecrtx.com', phone: '512-505-0946', mobile: '408-605-5471', linkedin: LI('danielle-black-69097610'),
    photo: '/Danielle_Black_-_Square.jpg', bio: BIO('danielle-ortiz'), color: '#f15825' },
  { id: 'jeannette-estrada', name: 'Jeannette Estrada', cred: '', title: 'Assistant Property Manager', dept: 'management', parent: 'danielle-ortiz',
    email: 'jestrada@ecrtx.com', phone: '512-505-2765', mobile: '737-318-3932', linkedin: LI('jeannette-estrada-3364b520'),
    photo: '/Jeannette_Estrada_-_Square.jpg', bio: BIO('jeannette-estrada'), color: '#f15825' },
  { id: 'katelyn-sims', name: 'Katelyn Sims', cred: '', title: 'Property Assistant', dept: 'management', parent: 'danielle-ortiz',
    email: 'ksims@ecrtx.com', phone: '512-505-0003', mobile: '512-525-1959', linkedin: LI('simskatelyn'),
    photo: '/Katelyn_Sims_-_Square.jpg', bio: BIO('katelyn-sims'), color: '#f15825' },
  { id: 'angela-odom-brown', name: 'Angela Odom-Brown', cred: '', title: 'Senior Property Manager', dept: 'management', parent: 'franziska-jackson',
    email: 'abrown@ecrtx.com', phone: '512-505-0026', mobile: '386-451-7144', linkedin: LI('angela-odom-brown-83563999'),
    photo: '/Angela_Odom-Brown_-_Square.jpg', bio: BIO('angela-odom-brown'), color: '#6a0e2e' },
  { id: 'madeline-powers', name: 'Madeline Powers', cred: '', title: 'Senior Property Manager', dept: 'management', parent: 'franziska-jackson',
    email: 'mpowers@ecrtx.com', phone: '512-505-0023', mobile: '903-268-6421', linkedin: LI('madeline-powers-76a0b068'),
    photo: '/Madeline_Powers_-_Square.jpg', bio: BIO('madeline-powers'), color: '#879792' },
  { id: 'alli-rockett', name: 'Alli Rockett', cred: '', title: 'Property Manager', dept: 'management', parent: 'franziska-jackson',
    email: 'arockett@ecrtx.com', phone: '512-505-0020', mobile: '254-749-7204', linkedin: '',
    photo: '/Alli_Rockett_-_Square.jpg', bio: BIO('alli-rockett'), color: '#f15825' },
  { id: 'jack-carroll', name: 'Jack Carroll', cred: '', title: 'Property Manager', dept: 'management', parent: 'franziska-jackson',
    email: 'jcarroll@ecrtx.com', phone: '512-505-0947', mobile: '512-284-4883', linkedin: LI('jack-carroll-548834148'),
    photo: '/Jack_Carroll_-_Square.jpg', bio: BIO('jack-carroll'), color: '#6a0e2e' },
  { id: 'stephanie-trevino', name: 'Stephanie Trevino', cred: 'MBA', title: 'Accounting Manager', dept: 'management', parent: 'franziska-jackson',
    email: 'strevino@ecrtx.com', phone: '512-505-0496', mobile: '512-925-6349', linkedin: LI('stephanie-trevino-manortx'),
    photo: '/Stephanie_Trevino_-_Square.jpg', bio: BIO('stephanie-trevino'), color: '#879792' },

  { id: 'jamie-mcewin', name: 'Jamie McEwin', cred: '', title: 'Senior Property Manager', dept: 'management', parent: 'michelle-ackermann',
    email: 'jmcewin@ecrtx.com', phone: '512-505-0007', mobile: '512-739-3069', linkedin: LI('jamie-mcewin-739058155'),
    photo: '/Jamie_McEwin_-_Square.jpg', bio: BIO('jamie-mcewin'), color: '#f15825' },
  { id: 'wendy-smith', name: 'Wendy Smith', cred: '', title: 'Assistant Property Manager', dept: 'management', parent: 'michelle-ackermann',
    email: 'wsmith@ecrtx.com', phone: '512-505-0012', mobile: '512-635-6618', linkedin: '',
    photo: '/Wendy_Smith_-_Square.jpg', bio: BIO('wendy-smith'), color: '#f15825' },
  { id: 'michael-wohl', name: 'Michael Wohl', cred: '', title: 'Property Assistant', dept: 'management', parent: 'michelle-ackermann',
    email: 'mwohl@ecrtx.com', phone: '512-505-0499', mobile: '512-497-8066', linkedin: LI('mawohl'),
    photo: '/Michael_Wohl_-_Square.jpg', bio: BIO('michael-wohl'), color: '#f15825' },
  { id: 'jennifer-umana', name: 'Jennifer Umana', cred: '', title: 'Assistant Property Manager', dept: 'management', parent: 'michelle-ackermann',
    email: 'jumana@ecrtx.com', phone: '512-505-0832', mobile: '580-480-5008', linkedin: LI('jennifer-u-1133862a'),
    photo: '/Jennifer_Umana_-_Square.jpg', bio: BIO('jennifer-umana'), color: '#f15825' },

  { id: 'graham-shearer', name: 'Graham Shearer', cred: '', title: 'Property Assistant', dept: 'management', parent: 'angela-odom-brown',
    email: 'gshearer@ecrtx.com', phone: '512-505-0495', mobile: '512-289-5029', linkedin: LI('graham-shearer-9a6a68290'),
    photo: '/Graham_Shearer_-_Square.jpg', bio: BIO('graham-shearer'), color: '#6a0e2e' },

  { id: 'taylor-fisher', name: 'Taylor Fisher', cred: '', title: 'Assistant Property Manager', dept: 'management', parent: 'madeline-powers',
    email: 'tfisher@ecrtx.com', phone: '512-505-0836', mobile: '512-803-4214', linkedin: LI('taylorcfisher'),
    photo: '/Taylor_Fisher_-_Square.jpg', bio: BIO('taylor-fisher'), color: '#879792' },
  { id: 'luis-elizondo', name: 'Luis Elizondo', cred: '', title: 'Property Assistant', dept: 'management', parent: 'madeline-powers',
    email: 'lelizondo@ecrtx.com', phone: '512-505-0498', mobile: '956-346-6209', linkedin: LI('luis-marcelo-elizondo'),
    photo: '/Luis_Elizondo_-_Square.jpg', bio: BIO('luis-elizondo'), color: '#879792' },

  { id: 'kelsey-cooper', name: 'Kelsey Cooper', cred: '', title: 'Senior Property Accountant', dept: 'management', parent: 'stephanie-trevino',
    email: 'kcooper@ecrtx.com', phone: '512-505-0885', mobile: '732-814-6261', linkedin: LI('kcooper-904'),
    photo: '/Kelsey_Cooper_-_Square.jpg', bio: BIO('kelsey-cooper'), color: '#879792' },
  { id: 'melissa-saucedo', name: 'Melissa Saucedo', cred: '', title: 'Senior Accounting Associate', dept: 'management', parent: 'stephanie-trevino',
    email: 'msaucedo@ecrtx.com', phone: '512-505-2767', mobile: '512-289-2954', linkedin: LI('melissa-saucedo-28403427a'),
    photo: '/Melissa_Saucedo_-_Square.jpg', bio: BIO('melissa-saucedo'), color: '#879792' },
  { id: 'gilma-garcia', name: 'Gilma Garcia', cred: '', title: 'Property Accountant', dept: 'management', parent: 'stephanie-trevino',
    email: 'ggarcia@ecrtx.com', phone: '512-505-0839', mobile: '712-444-0924', linkedin: LI('gilma-garcia'),
    photo: '/Gilma_Garcia_-_Square.jpg', bio: BIO('gilma-garcia'), color: '#879792' },
];

export const byId: Record<string, Person> = Object.fromEntries(PEOPLE.map(p => [p.id, p]));

export const kidMap: Record<string, Person[]> = {};
PEOPLE.forEach(p => {
  if (p.parent) {
    if (!kidMap[p.parent]) kidMap[p.parent] = [];
    kidMap[p.parent].push(p);
  }
});

export const roots = PEOPLE.filter(p => !p.parent);

export function colorOf(p: Person): string {
  return p.color;
}

export function initials(p: Person): string {
  return p.name.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

export function matchesPerson(p: Person, q: string): boolean {
  return (p.name + ' ' + p.title + ' ' + (p.cred || '')).toLowerCase().includes(q);
}
