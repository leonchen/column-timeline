import * as VD from 'virtual-dom';
const { h, create, diff, patch } = VD;

export enum ChartType {
  Preview,
  Detail,
}

export type DataElement = {
  key: string;
  props: { [key: string]: any };
  children?: DataElement[];
};

export type Data = {
  type: ChartType;
  data: DataElement[];
};

export type Style = { [key: string]: string };

export type Options = {
  rootClassName?: string;
  rootStyle?: Style;
};

const DEFAULT_OPTIONS = {};

export default class Chart {
  protected tree: VD.VTree;
  public rootNode: Element;
  protected opts: Options;

  constructor(parentNode: HTMLElement, options: Options) {
    this.opts = Object.assign({}, DEFAULT_OPTIONS, options);

    this.tree = this.getTree([]);
    this.rootNode = create(this.tree);
    parentNode.appendChild(this.rootNode);
  }

  protected getTree(children: VD.VNode[]) {
    const { rootClassName, rootStyle } = this.opts;
    return h(
      'div',
      {
        className: rootClassName,
        style: rootStyle || {},
      },
      children
    );
  }

  render(data: Data) {
    let newTree: VD.VTree;
    if (data.type === ChartType.Preview) {
      newTree = this.updatePreview(data.data);
      this.rootNode.className = 'preview-root';
    } else {
      newTree = this.updateDetail(data.data);
      this.rootNode.className = 'detail-root';
    }
    const patches = diff(this.tree, newTree);
    this.rootNode = patch(this.rootNode, patches);
    this.tree = newTree;
  }

  updatePreview(data: DataElement[]): VD.VTree {
    const children: VD.VNode[] = [];
    for (const c of data) {
      const className = `preview-child ${c.props.className || ''}`;
      children.push(
        h(
          'div',
          {
            ...c.props,
            key: c.key,
            className,
          },
          []
        )
      );
    }
    return this.getTree(children);
  }

  updateDetail(data: DataElement[]) {
    const children: VD.VNode[] = [];
    for (const d of data) {
      const subChildren: VD.VNode[] = [];

      for (const c of d.children || []) {
        const className = `detail-element ${c.props.className || ''}`;
        subChildren.push(
          h(
            'div',
            {
              ...c.props,
              key: c.key,
              className,
            },
            []
          )
        );
      }

      children.push(
        h(
          'div',
          {
            key: d.key,
            className: 'detail-child',
          },
          subChildren
        )
      );
    }

    return this.getTree(children);
  }
}
