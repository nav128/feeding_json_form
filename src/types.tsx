export interface IAnswer {
    id: string;
    answerType: string;
    content: string;
    relatedSectionId: string;
  }
  export interface IContent {
    id: string;
    title: string;
    contentType: string;
    content: string;
  }
  export interface ISection {
    id: string;
    sectionDescription: IContent;
    sectionType: string;
    answersList: IAnswer[];
    sectionTags: ITag[];
    solutions?: ISolution[];
    wikiItems?: IWiki[];
    score: number;
  }
  export interface ITag {
    id: string;
    title: string;
    score: number;
  }
  export interface ISolution extends IContent {
    solutionType: string;
  }
  export interface IProblem {
    id: string;
    score: number;
    image: string;
    problemDescription: IContent;
    problemTags: ITag[];
    followUpSections: ISection[];
    sections: ISection[];
    variationSections?: ISection[];
  }
  
  export interface IWiki extends IContent {
    wikiTags?: ITag[];
  }







  

  
 
  
 