# Third-Party Source Code Notices

This file documents third-party source code copied into this repository and its applicable licences.

Note: Licences of Gradle-resolved dependencies (Maven artifacts) are not covered by this file; it lists only source code copied into this repository.

## 1. FileKit (vinceglb)

- **Path in repository**: `composeApp/src/{commonMain,androidMain,desktopMain,iosMain,iosTest}/kotlin/com/melanoxy/noteelus/ui/components/fileKit/`
- **Description**: This folder is a copy of, adapted from FileKit (`core/` subpackage, following FileKit 0.8.x). Noteelus-specific additions inside that folder (for example `PhotoItem.kt`, `FileKitCompose.*`, and `FileKitPlatformSettings`) may have been written locally.
- **Upstream URL**: https://github.com/vinceglb/FileKit
- **Licence (SPDX)**: MIT
- **Copyright**: `Copyright (c) 2024 Vincent Guillebaud` (taken from the 0.8.8 tag)
- **Origin confirmation**: The `core/` subpackage structure and relative file names (`PickerMode`, `MacOSFilePicker`, `Foundation`, `ShTypes`, `AwtFilePicker`) match upstream package `io.github.vinceglb.filekit.core` in FileKit 0.8.x.
- **Per-file headers**: None restored, as upstream source files carry no per-file header.

```text
MIT License

Copyright (c) 2024 Vincent Guillebaud

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 2. Bonsai (Adriel Cafe)

- **Path in repository**: `composeApp/src/commonMain/kotlin/com/melanoxy/noteelus/ui/components/fileTree/`
- **Description**: Tree view UI component (`Bonsai.kt`, `node/*`, `tree/*`). `ExplorerTree`, `ExplorerElement`, and `ExplorerEvent` in the same directory are Noteelus's own code. A Compose Multiplatform fork exists at https://github.com/vooft/compose-treeview (also MIT), and which of the two repositories the copy was taken from is unconfirmed; the licence and copyright line are the same.
- **Upstream URL**: https://github.com/adrielcafe/bonsai (fork: https://github.com/vooft/compose-treeview)
- **Licence (SPDX)**: MIT
- **Copyright**: `Copyright (c) 2022 Adriel Café`
- **Origin confirmation**: The files `Bonsai.kt`, `node/*`, and `tree/*` match upstream `bonsai-core` names (`ComposeNode`, `UiNode`, `ExpandableNode`, `SelectableNode`, `ExpandableTree`).
- **Per-file headers**: None restored, as upstream source files carry no per-file header.

```text
The MIT License (MIT)

Copyright (c) 2022 Adriel Café

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 3. compose-code-editor (Waqas Tahir / Kirill Biakov)

- **Path in repository**: `composeApp/src/commonMain/kotlin/com/melanoxy/noteelus/ui/components/codeDetector/` (`model/CodeLang`, `parser/*`, `prettify/*`, `theme/CodeTheme`, `EditorThemes`, `SyntaxColors`)
- **Description**: Syntax highlighting and code theme definitions for Compose, which in turn ports Java Prettify. `LangCosmeticNotee.kt`, `LangLogicNotee.kt`, and `PrettifyParser.kt` in this repository are Noteelus's own code.
- **Upstream URL**: https://github.com/Qawaz/compose-code-editor
- **Licence (SPDX)**: MIT
- **Copyright**: `Copyright (c) 2024 Kirill Biakov, Waqas Tahir`
- **Origin confirmation**: The file names (`model/CodeLang`, `parser/*`, `prettify/*`, `theme/CodeTheme`, `EditorThemes`, `SyntaxColors`) and the Prettify port structure match upstream package `com.wakaztahir.codeeditor`.
- **Per-file headers**: None restored for the MIT-licensed part, as upstream files carry no per-file header.

```text
MIT License

Copyright (c) 2024 Kirill Biakov, Waqas Tahir

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 4. Java Prettify port / Google Prettify

- **Path in repository**: `composeApp/src/commonMain/kotlin/com/melanoxy/noteelus/ui/components/codeDetector/prettify/parser/{CombinePrefixPattern,Job,Prettify,Util}.kt` and `composeApp/src/commonMain/kotlin/com/melanoxy/noteelus/ui/components/codeDetector/prettify/lang/Lang.kt`
- **Description**: Syntax highlighting parser and base language class ported from Chan Wai Shing's Java Prettify, which is a port of Google Prettify by Mike Samuel (the Google Prettify README states that the copyright holder of Google Prettify is Mike Samuel and the licence is Apache 2.0, and the Java port is also licensed under Apache 2.0).
- **Upstream URL**: https://gerrit.googlesource.com/java-prettify/ (Java port by Chan Wai Shing) and https://github.com/google/code-prettify (Google Prettify by Mike Samuel)
- **Licence (SPDX)**: Apache-2.0
- **Copyright**: `Copyright (C) 2006 Google Inc.` (`CombinePrefixPattern.kt`, `Job.kt`, `Prettify.kt`) and `Copyright (C) 2011 Chan Wai Shing` (`Util.kt`, `Lang.kt`)
- **Origin confirmation**: The classes, comments referencing JavaScript Prettify, and `@author Chan Wai Shing` tags in `Job.kt` and `Util.kt` match the upstream Java Prettify port of Google Prettify.
- **Per-file headers**: Restored in all 5 files (`CombinePrefixPattern.kt`, `Job.kt`, `Prettify.kt`, `Util.kt`, `Lang.kt`).

```text

                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

   Copyright [yyyy] [name of copyright owner]

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```

## 5. Scrollbar code

- **Path in repository**: `composeApp/src/commonMain/kotlin/com/melanoxy/noteelus/ui/components/scroller/` and `composeApp/src/{androidMain,desktopMain,iosMain}/kotlin/com/melanoxy/noteelus/ui/components/scroller/ScrollbarAdapter*.kt`
- **Description**: Custom scrollbar UI components, scrollbar adapters, and indicator shape (`IndicatorShape.kt`).
- **Upstream URL**: **Unconfirmed**
- **Licence (SPDX)**: **Unconfirmed**
- **Copyright**: **Unconfirmed**
- **Origin confirmation**: Origin is **unconfirmed**: the file and type names (`Scrollbar`, `ScrollbarAdapter`, `SliderAdapter`, `ScrollbarStyle`, `ScrollOnPressTrack`, `ScrollbarDrag`) resemble the Compose Multiplatform desktop scrollbar (JetBrains, Apache-2.0), but no upstream project, copyright holder, or licence could be confirmed, and the origin of `IndicatorShape.kt` is also unconfirmed.
- **Per-file headers**: Headers were left as they are; this needs to be resolved by the repository owner.
