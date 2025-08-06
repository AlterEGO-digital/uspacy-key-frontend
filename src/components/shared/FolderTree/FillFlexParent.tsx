import React, { forwardRef, ReactElement } from 'react';
import useResizeObserver from 'use-resize-observer';

type AnyRef = React.MutableRefObject<Anything> | React.RefCallback<Anything> | null;

export default function mergeRefs(...refs: AnyRef[]) {
	return (instance: Anything) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') {
				ref(instance);
			} else if (ref != null) {
				ref.current = instance;
			}
		});
	};
}

type Props = {
	children: (dimens: { width: number; height: number }) => ReactElement;
};

const style = {
	flex: 1,
	width: '100%',
	height: '100%',
	minHeight: 0,
	minWidth: 0,
};

export const FillFlexParent = forwardRef(function FillFlexParent(props: Props, _ref) {
	const { ref, width, height } = useResizeObserver();
	return (
		<div style={style} ref={mergeRefs(ref, _ref)}>
			{width && height ? props.children({ width, height }) : null}
		</div>
	);
});
