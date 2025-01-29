## Getting Started

To duplicate this for another client, please head over to [Vercel](https://vercel.com/) and create a new project.

Import this Git Repository and add a fitting project name, e.g. dr-green-original-rick-ross

Copy the entire contents of the env file I have sent to you and paste this in the 'Environment Variables' dropdown where it says 'Key', this should add them all. The ones that will need changing are: 'PAGE_ID','NEXTAUTH_URL','NEXT_PUBLIC_URL'.

If you head over to the [WordPress URL](https://testsite.drgreennft.com/wp-admin/) then navigate to pages. If creating a new page, hover over an existing and click 'Duplicate This', then click 'Edit'. Once open, you'll see in the URL there is a parameter looking like: 'post=2', please copy the number from this parameter and add this to the 'PAGE_ID' value. This will hook up all of your content to the new website you're creating. Don't forget to click the blue 'Publish' button on the right if you have just duplicated a new page.

The other two that need updating will be the URL of the live website. Remember to remove the forward slash after the URL if you have copied it from the browser.

You are now ready to click 'Deploy'.

Head to the project, then go to 'Settings' and click into 'Domains'. This is where you can add your preferred domain for the live website. Once added, you can add the A records to your domain account and once propogation has finished the website should be live!
