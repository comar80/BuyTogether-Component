/* eslint-disable */

import React, { useRef } from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import { FormattedCurrency } from 'vtex.format-currency'
import { IconPlusLines } from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'
import { ProductGroupContext } from 'vtex.product-group-context'
import { useCssHandles } from 'vtex.css-handles'
import { usePixel } from 'vtex.pixel-manager/PixelContext'
import { useRecommendation } from 'vtex.recommendation-context/RecommendationContext'

import styles from './styles.css'
import IconEqual from './icons/IconEqual'
import { useOnView } from './hooks/useOnView'
import { useEvents } from './hooks/useEvents'

const { ProductGroupProvider } = ProductGroupContext

const messages = defineMessages({
  title: {
    id: 'store/shelf.buy-together.title',
    defaultMessage: '',
  },
  totalProducts: {
    id: 'store/shelf.buy-together.total-products.label',
    defaultMessage: '',
  },
})

interface Props {
  title?: string
  suggestedProducts?: Product[][]
  BuyButton: React.ComponentType<{ }>
}

const CSS_HANDLES = [
  'buyTogetherContainer',
  'buyTogetherTitleContainer',
  'buyTogetherTitle',
  'totalValue',
]

const BuyTogether: StorefrontFunctionComponent<Props> = ({ title, BuyButton }) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { page } = useRuntime()
  const { push } = usePixel()
  const ref = useRef<HTMLDivElement | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const recommendation = useRecommendation?.()
  const { onView } = useEvents(recommendation, push, page)

  useOnView({
    ref,
    onView: () => onView('buy-together'),
    once: true,
    initializeOnInteraction: true,
  })

  return (
    <div className={`flex-none tc ${handles.buyTogetherContainer}`}>
      <div className={`mv4 v-mid ${handles.buyTogetherTitleContainer}`}>
        <span className={handles.buyTogetherTitle}>
          {title && title !== '' ? (
            title
          ) : (
            <FormattedMessage {...messages.title} />
          )}
        </span>
      </div>
      <div className="flex flex-column flex-row-l">
        <div className="w-100 w-20-l">
          <div className={styles.productSummary} />
          <div>
            <img src="https://i.pinimg.com/736x/1c/92/a6/1c92a61c258957beefec7b0b42e8ef91.jpg" alt="blouse" />
          </div>
        </div>
        <div className="self-center ma5">
          <IconPlusLines size={20} />
        </div>
        <div className="w-100 w-20-l">
          <div className={styles.productSummary} />
          <div>
            <img src="https://i.pinimg.com/736x/1c/92/a6/1c92a61c258957beefec7b0b42e8ef91.jpg" alt="blouse" />
          </div>
        </div>
        <div className="self-center ma5">
          <IconEqual />
        </div>
        <div className="w-100 mh2 mh6-l w-20-l self-center">
          <div className="mb5">
            <FormattedMessage
              {...messages.totalProducts}
            />
          </div>
          <div className={`mv5 ${handles.totalValue}`}>
            <FormattedCurrency value={`300`} />
          </div>
          <BuyButton />
        </div>
      </div>
    </div>
  )
}

const EnhancedBuyTogether: StorefrontFunctionComponent<Props> = props => {
  return (
    <ProductGroupProvider>
      <BuyTogether {...props} />
    </ProductGroupProvider>
  )
}

EnhancedBuyTogether.schema = {
  title: 'admin/editor.buy-together.title',
}

export default EnhancedBuyTogether
