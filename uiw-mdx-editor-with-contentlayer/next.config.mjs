/** @type {import('next').NextConfig} */
import {withContentlayer} from 'next-contentlayer';
const nextConfig = {
    images: {
        domains: ['staticcdn.edwiser.org'],
    },
};

export default withContentlayer({...nextConfig});