import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { RedwoodSplashLayout } from 'src/components/RedwoodSplashLayout/RedwoodSplashLayout'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <RedwoodSplashLayout>
        <h1 className="prose-2xl">Home page</h1>
        <p>
          Find me in <code>./web/src/pages/HomePage/HomePage.tsx</code>
        </p>
        <p>
          My default route is named <code>home</code>, link to me with{' '}
          <code>
            <Link to={routes.home()}>Home</Link>
          </code>
        </p>
      </RedwoodSplashLayout>
    </>
  )
}

export default HomePage
