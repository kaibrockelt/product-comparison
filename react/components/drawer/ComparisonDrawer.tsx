import React, { useState } from 'react'
import { pathOr, isEmpty } from 'ramda'
import ComparisonContext from '../../ProductComparisonContext'
import { Button, Collapsible } from 'vtex.styleguide'
import { ExtensionPoint } from 'vtex.render-runtime'
import { withCssHandles } from 'vtex.css-handles'
import './drawer.css'

const CSS_HANDLES = [
  'drawerContainer',
  'expandCollapseButton',
  'comparisonButtons',
  'compareProductsButton',
  'drawer',
]

interface Props {
  cssHandles?: any
}

const ComparisonDrawer = ({ cssHandles }: Props) => {
  const [isCollapsed, setCollapsed] = useState(false)
  const {
    useProductComparisonState,
    useProductComparisonDispatch,
  } = ComparisonContext

  const comparisonData = useProductComparisonState()
  const dispatchComparison = useProductComparisonDispatch()

  const comparisonProducts = pathOr(
    [] as ProductToCompare[],
    ['products'],
    comparisonData
  )

  const removeAllItems = () => {
    dispatchComparison({
      type: 'REMOVE_ALL',
    })
  }

  const onExpandCollapse = () => {
    setCollapsed(!isCollapsed)
  }

  return isEmpty(comparisonProducts) ? (
    <div />
  ) : (
    <div
      className={`${cssHandles.drawerContainer} bg-white w-100 bt-ns b--light-gray flex justify-center`}
    >
      <div className="mw9 w-100 ">
        <Collapsible
          header={
            <div
              className={`${cssHandles.comparisonButtons} flex flex-row ma3`}
            >
              <div className="flex items-center-ns mr2 ml2">
                <span className="fw5 black">
                  <span>Compare </span> <span>{comparisonProducts.length}</span>
                  <span> Products</span>
                </span>
              </div>
              <div className="flex mr2 ml2">
                <button
                  onClick={onExpandCollapse}
                  className={`${cssHandles.expandCollapseButton} bg-transparent bn-ns t-small c-action-primary hover-c-action-primary pointer`}
                >
                  {!isCollapsed ? 'hide' : 'show'}
                </button>
              </div>
              <div className="flex-grow-1" />
              <div className="flex mr2 ml2">
                <Button
                  block
                  size="small"
                  className={`${cssHandles.compareProductsButton} ma3`}
                  href="/product-comparison"
                >
                  Compare
                </Button>
              </div>
              <div className="flex mr2 ml2">
                <Button
                  block
                  variation="danger-tertiary"
                  size="small"
                  onClick={removeAllItems}
                >
                  Remove All
                </Button>
              </div>
            </div>
          }
          isOpen={!isCollapsed}
        >
          <div
            className={`${cssHandles.drawer} flex flex-row justify-center pl3 pr3`}
          >
            {/* <DrawerShelf /> */}
            {/* {comparisonProducts.map(thumbnail => {
            return (
              // <ProductThumbnail
              //   key={`${thumbnail.productId}-${thumbnail.skuId}`}
              //   productToCompare={thumbnail}
              // />
              
            )
          })} */}
            <ExtensionPoint id="list-context.comparison-list" />
          </div>
        </Collapsible>
      </div>
    </div>
  )
}

export default withCssHandles(CSS_HANDLES)(ComparisonDrawer)
