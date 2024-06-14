import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

import { CodeViewer } from "@/components/playground/components/code-viewer";
import { MaxLengthSelector } from "@/components/playground/components/maxlength-selector";
import { ModelSelector } from "@/components/playground/components/model-selector";
import { PresetActions } from "@/components/playground/components/preset-actions";
import { PresetSave } from "@/components/playground/components/preset-save";
import { PresetSelector } from "@/components/playground/components/preset-selector";
import { PresetShare } from "@/components/playground/components/preset-share";
import { TemperatureSelector } from "@/components/playground/components/temperature-selector";
import { TopPSelector } from "@/components/playground/components/top-p-selector";
import { models, types } from "@/components/playground/data/models";
import { presets } from "@/components/playground/data/presets";
import { UserButton } from "@clerk/nextjs";

const ModelParam = () => {
  return (
    <div className="px-6 pt-6">
      <div className="hidden flex-col space-y-4 sm:flex md:order-2">
        <ModelSelector types={types} models={models} />
        <TemperatureSelector defaultValue={[0.56]} />
        <MaxLengthSelector defaultValue={[256]} />
      </div>
      {/* <Tabs defaultValue="complete" className="flex-1">
          <div className="container ">
            <div className="grid items-stretch gap-6 md:grid-cols-[1fr_200px]">
              <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                <ModelSelector types={types} models={models} />
                <TemperatureSelector defaultValue={[0.56]} />
                <MaxLengthSelector defaultValue={[256]} />
              </div>
              <div className="md:order-1">
                <TabsContent value="complete" className="mt-0 border-0 p-0">
                  <div className="flex h-full flex-col space-y-4">
                    <Textarea
                      placeholder="Write a tagline for an ice cream shop"
                      className="min-h-[400px] flex-1 p-4 md:min-h-[520px]"
                    />
                    <div className="flex items-center space-x-2">
                      <Button className="px-4 py-2">Submit</Button>
                      <Button className="px-8 py-2" variant="outline">
                        <span className="sr-only">Show history</span>
                        <CounterClockwiseClockIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="insert" className="mt-0 border-0 p-0">
                  <div className="flex flex-col space-y-4">
                    <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                      <Textarea
                        placeholder="We're writing to [inset]. Congrats from OpenAI!"
                        className="h-full min-h-[300px] md:min-h-[520px]"
                      />
                      <div className="rounded-md border bg-muted"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button className="px-4 py-2">Submit</Button>
                      <Button className="px-8 py-2" variant="outline">
                        <span className="sr-only">Show history</span>
                        <CounterClockwiseClockIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="edit" className="mt-0 border-0 p-0">
                  <div className="flex flex-col space-y-4">
                    <div className="grid h-full gap-6 lg:grid-cols-2">
                      <div className="flex flex-col space-y-4">
                        <div className="flex flex-1 flex-col space-y-2">
                          <Label htmlFor="input">Input</Label>
                          <Textarea
                            id="input"
                            placeholder="We is going to the market."
                            className="flex-1 md:min-h-[390px]"
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="instructions">Instructions</Label>
                          <Textarea
                            id="instructions"
                            placeholder="Fix the grammar."
                          />
                        </div>
                      </div>
                      <div className="mt-[21px] min-h-[400px] rounded-md border bg-muted md:min-h-[390px]" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button className="px-4 py-2">Submit</Button>
                      <Button className="px-4 py-2" variant="outline">
                        <span className="sr-only">Show history</span>
                        <CounterClockwiseClockIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </div>
        </Tabs> */}
    </div>
  );
};

export default ModelParam;
