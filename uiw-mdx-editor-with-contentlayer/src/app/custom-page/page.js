"use client";

import Accordion from "@/src/components/AccordionGroup";

const CustomPage = () => {
    return (<>
<div class="mt-2 bg-blue-600 text-sm text-white rounded-lg p-4 dark:bg-blue-500" role="alert">
  <span class="font-bold">Info</span> alert! You should check in on some of those fields below.
</div>
        <Accordion.Group >
            <Accordion.Item title="Accordion #1">
                <p>This is the first item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.</p>
            </Accordion.Item>
            <Accordion.Item title="Accordion #2">
                <p>This is the second item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.</p>
            </Accordion.Item>
            <Accordion.Item title="Accordion #3">
                <p>This is the third item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.</p>
            </Accordion.Item>
        </Accordion.Group>
        </>
    )
}

export default CustomPage;