interface BaseNode {
	id: string;
	name: string;
}

type FolderTreeNodeType = 'file' | 'folder';

type FileNode<T = Record<string, unknown>> = Prettify<
	BaseNode &
		T & {
			type: Extract<FolderTreeNodeType, 'file'>;
		}
>;

type FolderNode<T = Record<string, unknown>> = Prettify<
	BaseNode &
		T & {
			type: Extract<FolderTreeNodeType, 'folder'>;
			children?: NullOr<(FolderNode | FileNode)[]>;
		}
>;

type FolderTreeNode<T = Record<string, Anything>, F = Record<string, Anything>> = FolderNode<T> | FileNode<F>;
