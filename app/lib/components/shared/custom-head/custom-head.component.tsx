import React from 'react'
import Head from 'next/head'
import { CustomHeadProps } from './custom-head.types'

const CustomHead = ({
  title,
  description,
  keywords,
  author,
}: CustomHeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default CustomHead
