/* eslint-disable @typescript-eslint/no-shadow */
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { NodeApi, NodeRendererProps, Tree, TreeApi } from 'react-arborist';

import { FillFlexParent } from './FillFlexParent';
import styles from './styles.module.css';

type Data = { id: string; name: string; children?: Data[] };

type Node = {
	id: string;
	name: string;
	children?: Node[];
};

const data: Node[] = [
	{
		id: '1',
		name: 'LA',
		children: [
			{
				id: '2',
				name: 'New York',
				children: [
					{
						id: '3',
						name: 'Brooklyn',
						children: [
							{ id: '4', name: 'Williamsburg' },
							{ id: '5', name: 'Bushwick' },
							{ id: '6', name: 'Bedford-Stuyvesant' },
						],
					},
					{
						id: '7',
						name: 'Manhattan',
						children: [
							{ id: '8', name: 'Upper East Side' },
							{ id: '9', name: 'Harlem' },
							{ id: '10', name: 'Chelsea' },
						],
					},
				],
			},
			{
				id: '11',
				name: 'San Francisco',
				children: [
					{
						id: '12',
						name: 'Mission',
						children: [
							{ id: '13', name: 'Valencia Street' },
							{ id: '14', name: '24th Street' },
						],
					},
					{
						id: '15',
						name: 'SOMA',
						children: [
							{ id: '16', name: 'South Beach' },
							{ id: '17', name: 'Yerba Buena' },
						],
					},
				],
			},
			{
				id: '18',
				name: 'Chicago',
				children: [
					{
						id: '19',
						name: 'North Side',
						children: [
							{ id: '20', name: 'Lincoln Park' },
							{ id: '21', name: 'Lakeview' },
						],
					},
					{
						id: '22',
						name: 'South Side',
						children: [
							{ id: '23', name: 'Hyde Park' },
							{ id: '24', name: 'Englewood' },
						],
					},
				],
			},
		],
	},
	{
		id: '25',
		name: 'Houston',
		children: [
			{
				id: '26',
				name: 'Downtown',
				children: [
					{ id: '27', name: 'Theater District' },
					{ id: '28', name: 'Warehouse District' },
				],
			},
			{
				id: '29',
				name: 'Midtown',
				children: [
					{ id: '30', name: 'Montrose' },
					{ id: '31', name: 'Museum District' },
				],
			},
		],
	},
	{
		id: '32',
		name: 'Seattle',
		children: [
			{
				id: '33',
				name: 'Capitol Hill',
				children: [
					{ id: '34', name: 'Broadway' },
					{ id: '35', name: 'Pike/Pine' },
				],
			},
			{
				id: '36',
				name: 'Ballard',
				children: [
					{ id: '37', name: 'Old Ballard' },
					{ id: '38', name: 'Sunset Hill' },
				],
			},
		],
	},
	{
		id: '39',
		name: 'Boston',
		children: [
			{
				id: '40',
				name: 'Back Bay',
				children: [
					{ id: '41', name: 'Newbury Street' },
					{ id: '42', name: 'Copley Square' },
				],
			},
			{
				id: '43',
				name: 'Cambridge',
				children: [
					{ id: '44', name: 'Harvard Square' },
					{ id: '45', name: 'Kendall Square' },
				],
			},
		],
	},
	{
		id: '46',
		name: 'Miami',
		children: [
			{
				id: '47',
				name: 'Downtown',
				children: [
					{ id: '48', name: 'Brickell' },
					{ id: '49', name: 'Overtown' },
				],
			},
			{ id: '50', name: 'South Beach' },
		],
	},
];

const INDENT_STEP = 15;

export default function Cities() {
	const [tree, setTree] = useState<TreeApi<Data> | null | undefined>(null);
	const [active, setActive] = useState<Data | null>(null);
	const [focused, setFocused] = useState<Data | null>(null);
	const [selectedCount, setSelectedCount] = useState(0);
	const [searchTerm, setSearchTerm] = useState('');
	const [count, setCount] = useState(0);
	const [followsFocus, setFollowsFocus] = useState(false);
	const [disableMulti, setDisableMulti] = useState(false);

	useEffect(() => {
		setCount(tree?.visibleNodes.length ?? 0);
	}, [tree, searchTerm]);

	return (
		<div className={styles.container}>
			<div className={styles.split}>
				<div className={styles.treeContainer}>
					<FillFlexParent>
						{(dimens) => (
							<Tree
								{...dimens}
								initialData={data}
								selectionFollowsFocus={followsFocus}
								disableMultiSelection={disableMulti}
								// @ts-ignore
								ref={(t) => setTree(t)}
								openByDefault={true}
								searchTerm={searchTerm}
								selection={active?.id}
								className={styles.tree}
								rowClassName={styles.row}
								padding={15}
								rowHeight={30}
								indent={INDENT_STEP}
								overscanCount={8}
								onSelect={(selected) => setSelectedCount(selected.length)}
								onActivate={(node) => setActive(node.data)}
								onFocus={(node) => setFocused(node.data)}
								onToggle={() => {
									setTimeout(() => {
										setCount(tree?.visibleNodes.length ?? 0);
									});
								}}
							>
								{/* @ts-ignore */}
								{Node}
							</Tree>
						)}
					</FillFlexParent>
				</div>
				<div className={styles.contentContainer}>
					<h1>React Arborist Cities Demo</h1>
					<p className={styles.mobileWarning}>
						Heads up! <br />
						This site works best on a desktop screen.
					</p>
					<p>In this demo, we hook into some callbacks, use the tree ref api, and render a large number of nodes. </p>
					<section>
						<label>
							Demo the <i>selection</i> prop:
						</label>
						<button onClick={() => setActive({ id: '1840021543.', name: 'San Francisco' })}>Select San Francisco</button>
					</section>
					<section>
						<label>
							Demo the <i>searchTerm</i> prop:
						</label>
						<input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.currentTarget.value)} />
					</section>
					<section>
						<label>
							Demo the <i>selectionFollowsFocus</i> prop:
						</label>
						<input type="checkbox" checked={followsFocus} onChange={() => setFollowsFocus((v) => !v)} />
					</section>
					<section>
						<label>
							Demo the <i>disableMultiSelection</i> prop:
						</label>
						<input type="checkbox" checked={disableMulti} onChange={() => setDisableMulti((v) => !v)} />
					</section>
					<section>
						<label>
							Demo the <i>tree</i> ref:
						</label>
						<div className={styles.buttonRow}>
							<button onClick={() => tree?.selectAll()}>Select All</button>
							<button onClick={() => tree?.deselectAll()}>Select None</button>
						</div>
						<div className={styles.buttonRow}>
							<button onClick={() => tree?.openAll()}>Open All</button>
							<button onClick={() => tree?.closeAll()}>Close All</button>
						</div>
					</section>
					<div className={styles.statsgrid}>
						<section className={styles.infobox}>
							<label>Focused:</label>
							<div className={styles.stat}>{focused?.name ?? '(none)'}</div>
						</section>

						<section className={styles.infobox}>
							<label>Active:</label>
							<div className={styles.stat}>{active?.name ?? '(none)'}</div>
						</section>

						<section className={styles.infobox}>
							<label>Visible Nodes:</label>
							<div className={styles.stat}>{count}</div>
						</section>

						<section className={styles.infobox}>
							<label>Selected Items:</label>
							<div className={styles.stat}>{selectedCount}</div>
						</section>
					</div>
					<p>
						<a href="/">Back To Demos</a>
					</p>
					<p>
						<a href="https://github.com/brimdata/react-arborist">Go to Docs</a>
					</p>
					<p>
						<a href="https://twitter.com/specialcasedev">Follow on Twitter</a>
					</p>
				</div>
			</div>
		</div>
	);
}

function Node({ node, style, dragHandle }: NodeRendererProps<Data>) {
	const Icon = node.isInternal ? 'y' : 'x';
	const indentSize = Number.parseFloat(`${style.paddingLeft || 0}`);

	return (
		<div ref={dragHandle} style={style} className={clsx(styles.node, node.state)} onClick={() => node.isInternal && node.toggle()}>
			<div className={styles.indentLines}>
				{new Array(indentSize / INDENT_STEP).fill(0).map((_, index) => {
					return <div key={index}></div>;
				})}
			</div>
			<FolderArrow node={node} />
			{Icon} <span className={styles.text}>{node.isEditing ? <Input node={node} /> : node.data.name}</span>
		</div>
	);
}

function Input({ node }: { node: NodeApi<Data> }) {
	return (
		<input
			autoFocus
			name="name"
			type="text"
			defaultValue={node.data.name}
			onFocus={(e) => e.currentTarget.select()}
			onBlur={() => node.reset()}
			onKeyDown={(e) => {
				if (e.key === 'Escape') node.reset();
				if (e.key === 'Enter') node.submit(e.currentTarget.value);
			}}
		/>
	);
}

// function sortData(data: Data[]) {
// 	function sortIt(data: Data[]) {
// 		data.sort((a, b) => (a.name < b.name ? -1 : 1));
// 		data.forEach((d) => {
// 			if (d.children) sortIt(d.children);
// 		});
// 		return data;
// 	}
// 	return sortIt(data);
// }

function FolderArrow({ node }: { node: NodeApi<Data> }) {
	return <span className={styles.arrow}>{node.isInternal ? (node.isOpen ? '-' : '+') : null}</span>;
}
