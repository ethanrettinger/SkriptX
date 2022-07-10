import {
	TypeError,
	SyntaxError,
	ParseError
} from "./errors.js"

export default function tokenize(str) {
	const toks = str
		// split by words, lines and string literals
		.split(/\s+|\t|\r|\n|;/g)
		.filter(tok => tok !== '')
	let lookahead = false;
	let stringBuilder = [];
	let tokens = [];
	for(let i = 0; i < toks.length; i++) {
		if(toks[i].startsWith('"')) {
			lookahead = true;
			stringBuilder = [];
		}
		if (toks[i].endsWith('"') && lookahead) {
			lookahead = false;
			stringBuilder.push(toks[i]);
			tokens.push({
				value: stringBuilder.join(' '),
				tokenType: 'TextLiteral',
				type: 'Text'
			});
			stringBuilder = [];
			continue;
		}
		if(lookahead) {
			stringBuilder.push(toks[i]);
		} else {
			tokens.push({
				value: toks[i]
			});
		}
	}

	// figure out what type the tokens are
	return typify(tokens);
}
const KEYWORDS = [
	'class',
	'if',
	'else',
	'extends',
	'implements',
	'interface',
	'import',
	'global',
	'private',
	'persistant',
	'return'
]
const TYPES = [
	'Attribute',	'Biome',	'Block',	'BlockData',
	'Boolean',		'CatType',	'Chunk',	'ClickType',
	'Color',		'CommandSender',		'DamageCause',
	'Date',			'Difficulty',			'Direction',
	'Enchantment',	'EnchantmentOffer',		'EnchantmentType',
	'Entity',		'EntityType',			'EntityTypeWithAmount',
	'Experience',	'FireworkEffect',		'FireworkType',
	'Gamemode',		'Gamerule',				'GameruleValue',
	'Gene',			'HealReason',			'Inventory',
	'InventoryAction',						'InventorySlot',
	'InventoryType',			'Item',		'Material',
	'ItemType',		'LivingEntity',			'Location',
	'MetadataHolder',			'Money',	'Number',
	'Object',
	'OfflinePlayer',			'Player',	'PotionEffect',
	'PotionEffectType',						'Projectile',
	'Region',		'ResourcePackState',	'ServerIcon',
	'SoundCategory',						'SpawnReason',
	'TeleportCause',			'Text',		'Time',
	'Timeperiod',	'Timespan',	'TreeType',	'Type',
	'Vector',		'VisualEffect',			'WeatherType',
	'World'
	
]
const ASSIGNMENT_OPERATORS = [
	'=',	'+=',	'*=',	'/=',
	'/=',	'%=',	'**='
]
const ARITHMETIC_OPERATORS = [
	'+',	'-',	'*',	'/',
	'**',	'%',	'++',	'--'
];

const COMPARISON_OPERATORS = [
	'==',	'===',	'!=',	'!==',
	'>',	'<',	'>=',	'<=',
	'?'
]

const LOGICAL_OPERATORS = [
	'&&', '&&', '!'
]
// TODO: Refactor operator token checks to use guard cases
let scope = 'Global';
let scopeBreadcrumb = ['Global'];
function typify(tokens) {
	token: for(let i = 0; i < tokens.length; i++) {
		type: for(let typeIndex = 0; typeIndex < TYPES.length; typeIndex++) {
			if(tokens[i].value === TYPES[typeIndex] || tokens[i].value === `${TYPES[typeIndex]}[]`) {
				tokens[i].tokenType = 'Type'
				tokens[i].scope = scope;
				tokens[i].type = tokens[i].value === TYPES[typeIndex] ? TYPES[typeIndex] : `${TYPES[typeIndex]}Array`;
				try {
					if(tokens[i+1].value.endsWith(')')) {
						tokens[i+1].tokenType = 'IdentifierFunction';
						tokens[i+1].type = 'Function';
						tokens[i+1].returnType = tokens[i].type
						
					} else {
						tokens[i+1].tokenType = 'Identifier'
						tokens[i+1].type = tokens[i].type;
			
					}
					tokens[i+1].scope = scope;
				} catch (err) {
					console.log(SyntaxError(`No specified identifier for type ("${tokens[i].value}")`))
				}
				continue token;
			}
		}
		assignmentOps: for(let j = 0; j < ASSIGNMENT_OPERATORS.length; j++) {
			if(tokens[i].value === ASSIGNMENT_OPERATORS[j]) {
				tokens[i].tokenType = 'AssignmentOperator',
				tokens[i].type = 'Operator'
				tokens[i].scope = scope;
				continue token;
			}
		}
		arithmeticOps: for(let j = 0; j < ARITHMETIC_OPERATORS.length; j++) {
			if(tokens[i].value === ARITHMETIC_OPERATORS[j]) {
				tokens[i].tokenType = 'ArithmeticOperator';
				tokens[i].type = 'Operator';
				tokens[i].scope = scope;
				continue token;
			}
		}
		comparisonOps: for(let j = 0; j < COMPARISON_OPERATORS.length; j++) {
			if(tokens[i].value === COMPARISON_OPERATORS[j]) {
				tokens[i].tokenType = 'ComparisonOperator';
				tokens[i].type = 'Operator';
				tokens[i].scope = scope;
				continue token;
			}
		}
		logicalOps: for(let j = 0; j < LOGICAL_OPERATORS.length; j++) {
			if(tokens[i].value === LOGICAL_OPERATORS[j]) {
				tokens[i].tokenType = 'LogicalOperator';
				tokens[i].type = 'Operator';
				tokens[i].scope = scope;
				continue token;
			}
		}
		keywords: for(let j = 0; j < KEYWORDS.length; j++) {
			if(tokens[i].value !== KEYWORDS[j]) continue keywords;
			tokens[i].tokenType = 'Keyword';
			tokens[i].type = 'Keyword';
			tokens[i].scope = scope;
			if(tokens[i].value === 'class') {
				try {
					tokens[i+1].tokenType = 'Identifier';
					tokens[i+1].type = 'Identifier';
					tokens[i+1].scope = scope;
				} catch(err) {
					SyntaxError("Invalid identifier for class definition")
				}
			}
			continue token;
		}
		if(!isNaN(tokens[i].value)) {
			tokens[i].tokenType = 'NumericLiteral';
			tokens[i].type = 'Number';
			tokens[i].scope = scope;
			continue token;
		}
		if(tokens[i].value === '{') {
			tokens[i].scope = scope;
			scope = tokens[i-1].value;
			scopeBreadcrumb.push(tokens[i-1].value);
		} else if (tokens[i].value === '}') {
			tokens[i].scope = scope;
			scopeBreadcrumb.pop();
			scope = scopeBreadcrumb.at(-1)
		}
	}
	return tokens;
}